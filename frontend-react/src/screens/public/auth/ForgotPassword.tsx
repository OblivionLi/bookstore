import React, {ChangeEvent, FormEvent, useState} from 'react';
import MainNavbar from "../../../components/MainNavbar";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import {Link, useNavigate} from "react-router-dom";
import UsersService from "../../../services/UsersService";
import LocalStorageService from "../../../services/LocalStorageService";

const ForgotPassword = () => {
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
            <Breadcrumb page={"Forgot Password"}/>
            <hr/>
            <div className="container">
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
                            onChange={handleChange}
                        />
                    </div>
                    <div className="auth-actions">
                        <Link to={"/login"}>Never mind, I remembered my password..</Link>
                        <Link to={"/register"}>Don't have an account yet? Click here to register.
                        </Link>
                        <button type="submit" className="btn btn-primary">Send Password Request</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;