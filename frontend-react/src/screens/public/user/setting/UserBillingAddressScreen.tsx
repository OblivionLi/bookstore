import React, {useEffect, useState} from 'react';
import {IUserBillingAddress} from "../../../../types/user/IUserBillingAddress";
import UsersService from "../../../../services/UsersService";
import AddBillingAddressModal from "../../../../components/address/AddBillingAddressModal";
import EditBillingAddressModal from "../../../../components/address/EditBillingAddressModal";
import Typography from "@mui/material/Typography";
import {
    Button,
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Box from "@mui/material/Box";
import AddressSkeleton from "../../../../components/AddressSkeleton";

const UserBillingAddressScreen = () => {
    const [billingAddresses, setBillingAddresses] = useState<Array<IUserBillingAddress>>([]);
    const [editedAddress, setEditedAddress] = useState<IUserBillingAddress | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBillingAddresses();
    }, []);

    const fetchBillingAddresses = () => {
        UsersService.getAllBillingAddresses()
            .then((response: any) => {
                setBillingAddresses(response.data || []);
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleSave = () => {
        console.log("Billing address added with success.")
    }

    const handleSavedAddress = (isAddressSaved: boolean) => {
        if (isAddressSaved) {
            fetchBillingAddresses();
        }
    }

    const handleEdit = (index: number) => {
        const selectedAddress = billingAddresses[index];
        setEditedAddress(selectedAddress);
        setOpenEdit(true);
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleUpdatedAddress = (isAddressUpdated: boolean) => {
        if (isAddressUpdated) {
            fetchBillingAddresses();
        }
    }

    const handleDelete = (addressId: number) => {
        UsersService.deleteAddress(addressId, "billing")
            .then((response: any) => {
                fetchBillingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleMarkAsDefault = (addressId: number) => {
        UsersService.markAddressAsDefault(addressId, "billing")
            .then((response: any) => {
                fetchBillingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    return (
        <div className="user-settings-forms">
            <div className="user-settings-address-header">
                <Typography variant="h5">Billing Address</Typography>
                {billingAddresses.length < 3 && (
                    <Button onClick={handleOpenAdd}>Add Address</Button>
                )}
            </div>
            <Box sx={{borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2}}/>

            <p className="lead">
                <i>You can only have 3 billing addresses.</i> <br/>
                <i>The billing address with a grey background it's your default billing address.</i>
            </p>

            <Box sx={{borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2}}/>

            {billingAddresses.length === 0 ?
                (<p>You don't have any billing address set.</p>) :
                loading ? Array.from(new Array(1)).map((_, index) => <AddressSkeleton/>) : (
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Country</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Street</TableCell>
                                    <TableCell>Zipcode</TableCell>
                                    <TableCell>Billing name</TableCell>
                                    <TableCell>Is default?</TableCell>
                                    <TableCell>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {billingAddresses && billingAddresses.map((billingAddress, index) => (
                                    <TableRow key={index} sx={billingAddress?.default ? {bgcolor: 'action.focus'} : {}}>
                                        <TableCell>{billingAddress?.country || 'Not provided'}</TableCell>
                                        <TableCell>{billingAddress?.city || 'Not provided'} </TableCell>
                                        <TableCell>{billingAddress?.street || 'Not provided'}</TableCell>
                                        <TableCell>{billingAddress?.zipcode || 'Not provided'}</TableCell>
                                        <TableCell>{billingAddress?.billingName || 'Not provided'}</TableCell>
                                        <TableCell scope="row">{billingAddress.default ? "Yes" : "No"}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                disabled={billingAddress?.default}
                                                onClick={() => handleMarkAsDefault(billingAddress?.id)}
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
                                                onClick={() => handleDelete(billingAddress?.id)}
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

            <EditBillingAddressModal
                openEdit={openEdit}
                address={editedAddress}
                onSave={handleUpdatedAddress}
                onClose={handleCloseEdit}
            />

            <AddBillingAddressModal
                openAdd={openAdd}
                onSave={handleSavedAddress}
                onClose={handleCloseAdd}
            />
        </div>
    );
};

export default UserBillingAddressScreen;