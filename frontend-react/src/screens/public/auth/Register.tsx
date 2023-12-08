import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import MainNavbar from "../../../components/MainNavbar";
import UsersService from "../../../services/UsersService";
import LocalStorageService from "../../../services/LocalStorageService";
import {Link, useNavigate} from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

const Register = () => {
    const navigate = useNavigate();

    const checkTokenAndRedirect = () => {
        const isUserLoggedIn = LocalStorageService.isUserLogged();

        if (isUserLoggedIn) {
            navigate("/");
        }
    }

    useEffect(() => {
        checkTokenAndRedirect();
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [validationMessages, setValidationMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
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
            firstName: '',
            lastName: '',
            email: '',
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

        registerUser(formData);
        navigate("/");
    }

    const registerUser = (formData: object) => {
        UsersService.registerUser(formData)
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
            <Breadcrumb page={"Register"} />
            <hr/>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter your first name.."
                            required={true}
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        <div className="">{validationMessages.firstName}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Enter your last name.."
                            required={true}
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        <div className="">{validationMessages.lastName}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter your email.."
                            required={true}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        <div className="">{validationMessages.email}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
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
                        <Link to={"/login"}>Already have an account? Login here..</Link>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;