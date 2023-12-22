import React, {ChangeEvent, useEffect, useState} from 'react';
import IUserAddresses from "../../types/user/IUserAddresses";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersService from "../../services/UsersService";
import {IUserShippingAddress} from "../../types/user/IUserShippingAddress";
import {Button, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditShippingAddressModal: React.FC<IUserAddresses> = ({
                                                                openEdit,
                                                                address,
                                                                onSave,
                                                                onClose,
                                                            }) => {

    const shippingAddress = address as IUserShippingAddress;

    const initialFormData = {
        id: 0,
        addressType: "shipping",
        street: '',
        city: '',
        state: '',
        country: '',
        phoneNumber: '',
        zipcode: '',
        recipientName: '',
        deliveryNotes: '',
        default: false
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (shippingAddress) {
            setFormData({
                ...initialFormData,
                ...shippingAddress,
                id: shippingAddress?.id
            })
        }
    }, [shippingAddress]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSave = () => {
        UsersService.updateAddress(formData)
            .then((response: any) => {
                onSave(true);
                onClose();
            })
            .catch((e: any) => {
                onClose();
                console.log(e);
            });
    }

    return (
        <div>
            <Modal
                open={openEdit}
                onClose={onClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Shipping Address
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="street"
                                label="Change Street"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={shippingAddress?.street || ''}
                            />
                            <TextField
                                id="city"
                                label="Change City"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={shippingAddress?.city || ''}
                            />
                            <TextField
                                id="country"
                                label="Change Country"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={shippingAddress?.country || ''}
                            />
                            <TextField
                                id="state"
                                label="Change State"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={shippingAddress?.state || ''}
                            />
                            <TextField
                                id="phoneNumber"
                                label="Change Phone Number"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={shippingAddress?.phoneNumber || ''}
                            />
                            <TextField
                                id="zipCode"
                                label="Change Zipcode"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={shippingAddress?.zipcode || ''}
                            />
                            <TextField
                                id="recipientName"
                                label="Change Recipient Name"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={shippingAddress?.recipientName || ''}
                            />
                            <Button onClick={handleSave} variant="contained" color="primary" fullWidth
                                    style={{marginTop: '1rem'}}>Edit address</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default EditShippingAddressModal;