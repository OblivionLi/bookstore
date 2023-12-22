import React, {ChangeEvent, useState} from 'react';
import IAddAddressModalProps from "../../types/user/IAddAddressModalProps";
import UsersService from "../../services/UsersService";
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

const AddBillingAddressModal: React.FC<IAddAddressModalProps> = ({openAdd, onSave, onClose}) => {
    const [formData, setFormData] = useState({
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
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSave = () => {
        UsersService.saveAddress(formData)
            .then((response: any) => {
                onSave(true);
            })
            .catch((e: any) => {
                console.log(e);
            });
    }

    return (
        <div>
            <Modal
                open={openAdd}
                onClose={onClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Billing Address
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <form noValidate autoComplete="off">
                            <TextField id="street" label="Street" variant="standard" onChange={handleChange}
                                       fullWidth/>
                            <TextField id="city" label="City" variant="standard" onChange={handleChange}
                                       fullWidth/>
                            <TextField id="country" label="Country" variant="standard" onChange={handleChange}
                                       fullWidth/>
                            <TextField id="state" label="State" variant="standard" onChange={handleChange}
                                       fullWidth/>
                            <TextField id="phoneNumber" label="Phone Number" variant="standard"
                                       onChange={handleChange} fullWidth/>
                            <TextField id="zipCode" label="Zipcode" variant="standard" onChange={handleChange}
                                       fullWidth/>
                            <TextField id="billingName" label="Billing Name" variant="standard"
                                       onChange={handleChange} fullWidth/>
                            <Button onClick={handleSave} variant="contained" color="primary" fullWidth
                                    style={{marginTop: '1rem'}}>Save address</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default AddBillingAddressModal;