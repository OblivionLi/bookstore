import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import UsersService from "../../../services/UsersService";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import MainNavbar from "../../../components/MainNavbar";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import LocalStorageService from "../../../services/LocalStorageService";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        fetchIsResetPasswordTokenValid();
    }, []);

    const fetchIsResetPasswordTokenValid = () => {
        if (token) {
            UsersService.isResetPasswordTokenValid(token)
                .then((response: any) => {
                    if (response.data === false) {
                        navigate("/");
                    }
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        token: ''
    });

    const [validationMessages, setValidationMessages] = useState({
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setValidationMessages({
            password: '',
            confirmPassword: '',
        });

        if (formData.password !== formData.confirmPassword) {
            setValidationMessages({
                ...validationMessages,
                confirmPassword: 'Passwords do not match.',
            });
            return;
        }

        if (!token) {
            return;
        }

        formData.token = token;

        resetUserPassword(formData);
        navigate("/");
    }

    const resetUserPassword = (formData: object) => {
        UsersService.resetUserPassword(formData)
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
        <>
            <MainNavbar/>
            <Breadcrumb page={"Login"} />
            <hr/>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required={true}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            required={true}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <div className="">{validationMessages.confirmPassword}</div>
                    </div>
                    <div className="auth-actions">
                        <Link to={"/login"}>Never mind, I remembered my password..</Link>
                        <Link to={"/register"}>Don't have an account yet? Click here to register.
                        </Link>
                        <button type="submit" className="btn btn-primary">Reset Password</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;