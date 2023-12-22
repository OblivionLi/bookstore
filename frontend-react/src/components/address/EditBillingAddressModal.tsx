import React, {ChangeEvent, useEffect, useState} from 'react';
import IUserAddresses from "../../types/user/IUserAddresses";
import UsersService from "../../services/UsersService";
import {IUserBillingAddress} from "../../types/user/IUserBillingAddress";
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

const EditBillingAddressModal: React.FC<IUserAddresses> = ({
                                                               openEdit,
                                                               address,
                                                               onSave,
                                                               onClose,
                                                           }) => {

    const billingAddress = address as IUserBillingAddress;

    const initialFormData = {
        id: 0,
        addressType: "billing",
        street: '',
        city: '',
        state: '',
        country: '',
        phoneNumber: '',
        zipcode: '',
        billingName: '',
        default: false
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (billingAddress) {
            setFormData({
                ...initialFormData,
                ...billingAddress,
                id: billingAddress?.id
            })
        }
    }, [billingAddress]);

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
                        Edit Billing Address
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="street"
                                label="Change Street"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={billingAddress?.street || ''}
                            />
                            <TextField
                                id="city"
                                label="Change City"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={billingAddress?.city || ''}
                            />
                            <TextField
                                id="country"
                                label="Change Country"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={billingAddress?.country || ''}
                            />
                            <TextField
                                id="state"
                                label="Change State"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={billingAddress?.state || ''}
                            />
                            <TextField
                                id="phoneNumber"
                                label="Change Phone Number"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={billingAddress?.phoneNumber || ''}
                            />
                            <TextField
                                id="zipCode"
                                label="Change Zipcode"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={billingAddress?.zipcode || ''}
                            />
                            <TextField
                                id="billingName"
                                label="Change Billing Name"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                defaultValue={billingAddress?.billingName || ''}
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

export default EditBillingAddressModal;