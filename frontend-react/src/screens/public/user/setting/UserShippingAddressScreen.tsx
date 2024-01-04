import React, {useEffect, useState} from 'react';
import {IUserShippingAddress} from "../../../../types/user/IUserShippingAddress";
import UsersService from "../../../../services/UsersService";
import EditShippingAddressModal from "../../../../components/address/EditShippingAddressModal";
import AddShippingAddressModal from "../../../../components/address/AddShippingAddressModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button, Modal, Grid, Skeleton
} from "@mui/material";
import AddressSkeleton from "../../../../components/AddressSkeleton";
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../../../../services/LocalStorageService";

const UserShippingAddressScreen = () => {
    const navigate = useNavigate();
    const [shippingAddresses, setShippingAddresses] = useState<Array<IUserShippingAddress>>([]);
    const [editedAddress, setEditedAddress] = useState<IUserShippingAddress | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const isUserLogged = LocalStorageService.isUserLogged();

    useEffect(() => {
        if (!isUserLogged) {
            navigate("/login");
            return;
        }

        fetchShippingAddresses();
    }, []);

    const fetchShippingAddresses = () => {
        UsersService.getAllShippingAddresses()
            .then((response: any) => {
                setShippingAddresses(response.data || []);
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleEdit = (index: number) => {
        const selectedAddress = shippingAddresses[index];
        setEditedAddress(selectedAddress);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleUpdatedAddress = (isAddressUpdated: boolean) => {
        if (isAddressUpdated) {
            fetchShippingAddresses();
        }
    };

    const handleSavedAddress = (isAddressSaved: boolean) => {
        if (isAddressSaved) {
            fetchShippingAddresses();
        }
    }

    const handleCloseModal = () => {
        setEditedAddress(null);
    };

    const handleDelete = (addressId: number) => {
        UsersService.deleteAddress(addressId, "shipping")
            .then((response: any) => {
                fetchShippingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleMarkAsDefault = (addressId: number) => {
        UsersService.markAddressAsDefault(addressId, "shipping")
            .then((response: any) => {
                fetchShippingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    return (
        <div className="user-settings-forms">
            <div className="user-settings-address-header">
                <Typography variant="h5">Shipping Address</Typography>
                {shippingAddresses.length < 3 && (
                    <Button onClick={handleOpenAdd}>Add Address</Button>
                )}
            </div>
            <Box sx={{borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2}}/>

            <p className="lead">
                <i>You can only have 3 shipping addresses.</i> <br/>
                <i>The shipping address with a grey background it's your default shipping address.</i>
            </p>

            <Box sx={{borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2}}/>
            {shippingAddresses.length === 0 ?
                (<p>You don't have any shipping address set.</p>) :
                loading ? Array.from(new Array(1)).map((_, index) => <AddressSkeleton/>) : (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Country</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Street</TableCell>
                                <TableCell>Zipcode</TableCell>
                                <TableCell>Recipient name</TableCell>
                                <TableCell>Is default?</TableCell>
                                <TableCell>Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shippingAddresses && shippingAddresses.map((shippingAddress, index) => (
                                <TableRow key={index} sx={shippingAddress?.default ? {bgcolor: 'action.focus'} : {}}>
                                    <TableCell>{shippingAddress?.country || 'Not provided'}</TableCell>
                                    <TableCell>{shippingAddress?.city || 'Not provided'}</TableCell>
                                    <TableCell>{shippingAddress?.street || 'Not provided'}</TableCell>
                                    <TableCell>{shippingAddress?.zipcode || 'Not provided'}</TableCell>
                                    <TableCell>{shippingAddress?.recipientName || 'Not provided'}</TableCell>
                                    <TableCell>{shippingAddress?.default ? "Yes" : "No"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            disabled={shippingAddress?.default}
                                            onClick={() => handleMarkAsDefault(shippingAddress?.id)}
                                            style={{marginRight: '5px'}}
                                        >
                                            Mark Default
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleEdit(index)}
                                            style={{marginRight: '5px'}}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(shippingAddress?.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <AddShippingAddressModal
                openAdd={openAdd}
                onSave={handleSavedAddress}
                onClose={handleCloseAdd}
            />

            <EditShippingAddressModal
                openEdit={openEdit}
                address={editedAddress}
                onSave={handleUpdatedAddress}
                onClose={handleCloseEdit}
            />
        </div>
    );
};

export default UserShippingAddressScreen;