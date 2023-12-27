import React, {ChangeEvent, FormEvent, useState} from 'react';
import MainNavbar from "../../../components/MainNavbar";
import {Link, useNavigate} from "react-router-dom";
import UsersService from "../../../services/UsersService";
import BreadcrumbMulti from "../../../components/breadcrumb/BreadcrumbMulti";
import {Button, Paper, TextField} from "@mui/material";

const ForgotPasswordScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        forgotPassword(email);
    }

    const forgotPassword = (email: string) => {
        UsersService.forgotPassword(email)
            .then((response: any) => {
                navigate("/")
            })
            .catch((e: any) => {
                console.log(e);
            });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["Register"]}/>
            <Paper elevation={3}
                   sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        onChange={handleChange}
                    />
                    <div className="auth-actions">
                        <Link to={"/login"} style={{textDecoration: "none"}}>Never mind, I remembered my
                            password..</Link>
                        <Link to={"/register"} style={{textDecoration: "none"}}>Don't have an account yet? Click here to
                            register.
                        </Link>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                            Send Password Request
                        </Button>
                    </div>
                </form>
            </Paper>
        </>
    );
};

export default ForgotPasswordScreen;