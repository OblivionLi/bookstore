import React, {useEffect, useState} from 'react';
import MainNavbar from "../../../../components/MainNavbar";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import LocalStorageService from "../../../../services/LocalStorageService";
import UserDetails from "./UserDetails";
import IUserTokenDecodedData from "../../../../types/IUserTokenDecodedData";
import UserShippingAddress from "./UserShippingAddress";
import UserBillingAddress from "./UserBillingAddress";

const UserSettings = () => {
    const navigate = useNavigate();
    const userData = LocalStorageService.getUserData() as IUserTokenDecodedData;
    const [selectedForm, setSelectedForm] = useState<string | null>('user-details');

    const checkTokenAndRedirect = () => {
        const isUserLoggedIn = LocalStorageService.isUserLogged();

        if (!isUserLoggedIn) {
            navigate("/");
        }
    }

    useEffect(() => {
        checkTokenAndRedirect();
    }, []);

    const renderForm = () => {
        switch (selectedForm) {
            case 'user-details':
                return <UserDetails userData={userData} />;
            case 'shipping-address':
                return <UserShippingAddress />;
            case 'billing-address':
                return <UserBillingAddress />;
            default:
                return null;
        }
    };

    return (
        <>
            <MainNavbar/>
            <Breadcrumb page={"User Settings"}/>
            <hr/>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h2>User Settings:</h2>
                        <hr/>
                        <div className="settings-links">
                            <Link to="#" onClick={() => setSelectedForm('user-details')}>
                                User Details
                            </Link>
                            <Link to="#" onClick={() => setSelectedForm('shipping-address')}>
                                Shipping Address
                            </Link>
                            <Link to="#" onClick={() => setSelectedForm('billing-address')}>
                                Billing Address
                            </Link>
                        </div>
                    </div>

                    <div className="col-9">
                        {renderForm()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSettings;