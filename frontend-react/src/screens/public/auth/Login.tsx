import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from "../../../components/MainNavbar";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import {Link, redirect} from "react-router-dom";
import UsersService from "../../../services/UsersService";
import LocalStorageService from "../../../services/LocalStorageService";

const Login = () => {
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
        email: '',
        password: '',
    });

    const [validationMessages, setValidationMessages] = useState({
        email: '',
        password: '',
    });

    const [usernameNotFound, setUsernameNotFound] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setValidationMessages({
            email: '',
            password: '',
        });

        loginUser(formData);
    }

    const loginUser = (formData: object) => {
        UsersService.loginUser(formData)
            .then((response: any) => {
                LocalStorageService.addUserTokenToLocalStorage(response.data.token)
                navigate("/")
            })
            .catch((e: any) => {
                if (e.response) {
                    const errorData = e.response.data;

                    if (errorData.errors && Array.isArray(errorData.errors)) {
                        errorData.errors.forEach((errorMessage: string) => {
                            if (errorMessage == "Username not found") {
                                setUsernameNotFound(errorMessage);
                                return;
                            }
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
                {usernameNotFound && <div className="alert alert-danger" role="alert">{usernameNotFound}</div>}
                <form onSubmit={handleSubmit}>
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
                    <div className="auth-actions">
                        <Link to={"/register"}>Don't have an account yet? Register here..</Link>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;