import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import MainNavbar from "../../../components/MainNavbar";
import {Link, redirect} from "react-router-dom";
import UsersService from "../../../services/UsersService";
import LocalStorageService from "../../../services/LocalStorageService";
import BreadcrumbMulti from "../../../components/breadcrumb/BreadcrumbMulti";
import {Button, Paper, TextField} from "@mui/material";

const LoginScreen = () => {
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
            <BreadcrumbMulti items={["Login"]}/>
            <Paper elevation={3}
                   sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                {usernameNotFound && <div className="alert alert-danger" role="alert">{usernameNotFound}</div>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(validationMessages.email)}
                        helperText={validationMessages.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        helperText={validationMessages.password}
                    />
                    <div className="auth-actions">
                        <Link to={"/forgot-password"} style={{textDecoration: "none"}}>Forgot password? Click here and
                            reset it.</Link>
                        <Link to={"/register"} style={{textDecoration: "none"}}>Don't have an account yet? Click here to
                            register.
                        </Link>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                            Login
                        </Button>
                    </div>
                </form>
            </Paper>
        </>
    );
};

export default LoginScreen;