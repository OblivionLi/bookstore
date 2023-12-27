import React, {useEffect, useState} from 'react';
import MainNavbar from "../../../../components/MainNavbar";
import {Link, useNavigate} from "react-router-dom";
import LocalStorageService from "../../../../services/LocalStorageService";
import UserDetailsScreen from "./UserDetailsScreen";
import IUserTokenDecodedData from "../../../../types/user/IUserTokenDecodedData";
import UserShippingAddressScreen from "./UserShippingAddressScreen";
import UserBillingAddressScreen from "./UserBillingAddressScreen";
import BreadcrumbMulti from "../../../../components/breadcrumb/BreadcrumbMulti";
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const UserSettingsScreen = () => {
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
                return <UserDetailsScreen userData={userData}/>;
            case 'shipping-address':
                return <UserShippingAddressScreen/>;
            case 'billing-address':
                return <UserBillingAddressScreen/>;
            default:
                return null;
        }
    };

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["User-Settings"]}/>
            <Paper elevation={3}
                   sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h5">User Settings:</Typography>
                        <Box sx={{borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2}} />
                        <div className="settings-links">
                            <Link to="#" style={{textDecoration: "none"}} onClick={() => setSelectedForm('user-details')}>
                                User Details
                            </Link>
                            <Link to="#" style={{textDecoration: "none"}} onClick={() => setSelectedForm('shipping-address')}>
                                Shipping Address
                            </Link>
                            <Link to="#" style={{textDecoration: "none"}} onClick={() => setSelectedForm('billing-address')}>
                                Billing Address
                            </Link>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        {renderForm()}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default UserSettingsScreen;