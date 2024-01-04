import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {
    Button, Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    InputLabel,
    Paper,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import IUserEditModalProps from "../../../types/user/IUserEditModalProps";
import UsersService from "../../../services/UsersService";
import IUsersRolesResponse from "../../../types/user/IUsersRolesResponse";
import IUserEditRequest from "../../../types/user/IUserEditRequest";
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../../../services/LocalStorageService";

const EditUserDialog:React.FC<IUserEditModalProps> = ({ open, onClose, rowData }) => {
    const [allRoles, setAllRoles] = useState<IUsersRolesResponse>({ roles: [] });
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        email: rowData?.email !== null ? rowData?.email : ''
    });

    const [validationMessages, setValidationMessages] = useState({
        email: '',
    });

    const navigate = useNavigate();
    const isUserAuthorized = LocalStorageService.isUserAuthorized();

    useEffect(() => {
        if (!isUserAuthorized) {
            navigate("/login");
            return;
        }

        fetchRoles();
        setSelectedRoles(rowData?.userGroupCodes || [])
        setFormData((prevFormData) => ({ ...prevFormData, email: rowData?.email || '' }));
    }, [rowData?.userGroupCodes, rowData?.email]);

    const fetchRoles = () => {
        UsersService.getUserRoles()
            .then((response: any) => {
                setAllRoles(response.data || { roles: [] });
            })
            .catch((e: any) => {
                console.error(e);
            });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setValidationMessages({
            email: '',
        });

        const userNewData: IUserEditRequest = {
            id: rowData?.id,
            email: formData.email,
            roles: selectedRoles
        }

        editUser(userNewData);
        onClose();
    }

    const editUser = (userNewData: IUserEditRequest) => {
        UsersService.editUser(userNewData)
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleChipClick = (role: string) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((r) => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <Paper elevation={3}
                       sx={{padding: 3, marginTop: 3, width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            defaultValue={rowData?.email || ''}
                            onChange={handleChange}
                            error={Boolean(validationMessages.email)}
                            helperText={validationMessages.email}
                        />
                        <InputLabel style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>User Roles</InputLabel>
                        <Divider style={{ margin: '1rem 0' }}/>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {allRoles.roles.map((role) => (
                                <Chip
                                    key={role}
                                    label={role}
                                    onClick={() => handleChipClick(role)}
                                    style={{
                                        marginRight: 8,
                                        marginBottom: 8,
                                        backgroundColor: selectedRoles.includes(role) ? '#4caf50' : '#bdbdbd',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                        <Divider/>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                            Edit User
                        </Button>
                    </form>
                </Paper>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;