import React, {useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import {
    Box,
    CssBaseline,
    Divider, Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Switch,
    Typography
} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link, Outlet, Route, Router, Routes, useNavigate} from "react-router-dom";
import LocalStorageService from "../../services/LocalStorageService";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeScreen from "../public/HomeScreen";
import ShowBookScreen from "../public/book/ShowBookScreen";
import AdminUsersScreen from "./user/AdminUsersScreen";
import GroupIcon from '@mui/icons-material/Group';
import AdminDashboardScreen from "./AdminDashboardScreen";

const drawerWidth = 240;

const AdminScreen = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        LocalStorageService.logoutUser();
        navigate("/");
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <Link
                            to={"/admin"}
                        >
                            Dashboard
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <Link
                            to={"/admin/users"}
                        >
                            Users
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <KeyboardReturnIcon />
                        </ListItemIcon>
                        <Link
                            to={"/"}
                        >
                            Return To Home
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Administration Area
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={document.body}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<AdminDashboardScreen />} />
                    <Route path="/users" element={<AdminUsersScreen />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default AdminScreen;