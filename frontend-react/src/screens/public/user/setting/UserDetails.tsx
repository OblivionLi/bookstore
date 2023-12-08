import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import UsersService from "../../../../services/UsersService";
import LocalStorageService from "../../../../services/LocalStorageService";
import {useNavigate} from "react-router-dom";
import IUserTokenDecodedData from "../../../../types/IUserTokenDecodedData";

const UserDetails = ({ userData }: { userData: IUserTokenDecodedData }) => {
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
                <h2>My roles: <i>{userRoles}</i></h2>
            </div>
            <hr/>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Change First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter your new first name.."
                        required={true}
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                    <div className="">{validationMessages.firstName}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Change Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter your new last name.."
                        required={true}
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                    <div className="">{validationMessages.lastName}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Change email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter your new email.."
                        required={true}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <div className="">{validationMessages.email}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Change Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="auth-actions">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UserDetails;