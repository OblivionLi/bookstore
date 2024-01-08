import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../../services/LocalStorageService";

const AdminDashboardScreen = () => {
    const navigate = useNavigate();
    const isUserAuthorized = LocalStorageService.isUserAuthorized();

    useEffect(() => {
        if (!isUserAuthorized) {
            navigate("/login");
            return;
        }
    }, []);

    return (
        <div>
            dashboard
        </div>
    );
};

export default AdminDashboardScreen;