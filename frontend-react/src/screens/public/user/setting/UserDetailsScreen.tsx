import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import UsersService from "../../../../services/UsersService";
import LocalStorageService from "../../../../services/LocalStorageService";
import {useNavigate} from "react-router-dom";
import IUserTokenDecodedData from "../../../../types/user/IUserTokenDecodedData";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";

const UserDetailsScreen = ({ userData }: { userData: IUserTokenDecodedData }) => {
    const navigate = useNavigate();
    const [userRoles, setUserRoles] = useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [validationMessages, setValidationMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData((prevState) => ({
                ...prevState,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.sub || ''
            }));

            const rolesWithoutPrefix: string[] = userData.roles.map(role => role.replace(/^ROLE_/, ''));
            setUserRoles(rolesWithoutPrefix.join(", "));
        } else {
            navigate("/user-settings")
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setValidationMessages({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });

        updateUserDetails(formData);
        navigate("/user-settings")
    }

    const updateUserDetails = (formData: object) => {
        UsersService.updateUserDetails(formData)
            .then((response: any) => {
                LocalStorageService.addUserTokenToLocalStorage(response.data.token)
            })
            .catch((e: any) => {
                if (e.response) {
                    const errorData = e.response.data;

                    if (errorData.errors && Array.isArray(errorData.errors)) {
                        errorData.errors.forEach((errorMessage: string) => {
                            const [fieldName, errorDescription] = errorMessage.split(':');

                            setValidationMessages((prevValidationMessages) => ({
                                ...prevValidationMessages,
                                [fieldName.trim()]: errorDescription.trim(),
                            }));
                        });
                    }
                }

            });
    }

    return (
        <div className="user-settings-forms">
            <div>
                <Typography variant="h5">My roles: <i>{userRoles}</i></Typography>
            </div>
            <Box sx={{borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2}}/>

            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="Change First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(validationMessages.firstName)}
                    helperText={validationMessages.firstName}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Change Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(validationMessages.lastName)}
                    helperText={validationMessages.lastName}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Change Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(validationMessages.email)}
                    helperText={validationMessages.email}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Change Password"
                    type="password"
                    onChange={handleChange}
                />

                <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                    Update
                </Button>
            </form>
        </div>
    );
};

export default UserDetailsScreen;