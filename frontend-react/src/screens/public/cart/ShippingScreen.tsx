import React, {useEffect, useState} from 'react';
import MainNavbar from "../../../components/MainNavbar";
import BreadcrumbMulti from "../../../components/breadcrumb/BreadcrumbMulti";
import CartSummary from "../../../components/cart/CartSummary";
import LocalStorageService from "../../../services/LocalStorageService";
import IBooksData from "../../../types/book/IBooksData";
import UsersService from "../../../services/UsersService";
import EditShippingAddressModal from "../../../components/address/EditShippingAddressModal";
import IUserDefaultAddress from "../../../types/user/IUserDefaultAddress";
import EditBillingAddressModal from "../../../components/address/EditBillingAddressModal";
import IOrderItemRequest from "../../../types/order/IOrderItemRequest";
import IUserShippingAddressRequest from "../../../types/user/IUserShippingAddressRequest";
import IUserBillingAddressRequest from "../../../types/user/IUserBillingAddressRequest";
import IPlaceOrderRequest from "../../../types/order/IPlaceOrderRequest";
import OrdersService from "../../../services/OrdersService";
import {Link, useNavigate} from "react-router-dom";
import {Button, Divider, Grid, List, ListItem, Paper, TextField, Typography} from "@mui/material";

const ShippingScreen = () => {
    const navigate = useNavigate();
    const cartItems = LocalStorageService.getAllCartItems();
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(null);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [openEditBilling, setOpenEditBilling] = useState(false);
    const [openEditShipping, setOpenEditShipping] = useState(false);

    useEffect(() => {
        fetchDefaultShippingAddress();
        fetchDefaultBillingAddress();
    }, []);

    const mapToAddress = (data: any): IUserDefaultAddress | null => {
        if (!data) {
            return null;
        }

        return {
            id: data.id,
            billingName: data.billingName,
            city: data.city,
            country: data.country,
            phoneNumber: data.phoneNumber,
            recipientName: data.recipientName,
            state: data.state,
            street: data.street,
            zipcode: data.zipcode,
        };
    };


    const fetchDefaultShippingAddress = () => {
        UsersService.getDefaultShippingAddress()
            .then((response: any) => {
                mapToAddress(response.data);
                setDefaultShippingAddress(response.data || []);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const fetchDefaultBillingAddress = () => {
        UsersService.getDefaultBillingAddress()
            .then((response: any) => {
                mapToAddress(response.data);
                setDefaultBillingAddress(response.data || []);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleUpdatedAddress = (isAddressUpdated: boolean) => {
        if (isAddressUpdated) {
            fetchDefaultShippingAddress();
            fetchDefaultBillingAddress();
        }
    };

    const handleCloseModal = () => {
        setOpenEditBilling(false);
        setOpenEditShipping(false);
    };


    const placeOrder = () => {
        let orderItems: IOrderItemRequest[] = [];

        for (let i = 0; i < cartItems.length; i++) {
            const orderItem: IOrderItemRequest = {
                itemId: cartItems[i].id,
                quantity: cartItems[i].quantity,
                itemPrice: cartItems[i].price,
                discount: cartItems[i].discount
            };

            orderItems.push(orderItem);
        }

        const userShippingAddress: IUserShippingAddressRequest = {
            street: mapToAddress(defaultShippingAddress)?.street,
            city: mapToAddress(defaultShippingAddress)?.city,
            state: mapToAddress(defaultShippingAddress)?.state,
            country: mapToAddress(defaultShippingAddress)?.country,
            phoneNumber: mapToAddress(defaultShippingAddress)?.phoneNumber,
            zipcode: mapToAddress(defaultShippingAddress)?.zipcode,
            recipientName: mapToAddress(defaultShippingAddress)?.recipientName,
        }

        const userBillingAddress: IUserBillingAddressRequest = {
            street: mapToAddress(defaultBillingAddress)?.street,
            city: mapToAddress(defaultBillingAddress)?.city,
            state: mapToAddress(defaultBillingAddress)?.state,
            country: mapToAddress(defaultBillingAddress)?.country,
            phoneNumber: mapToAddress(defaultBillingAddress)?.phoneNumber,
            zipcode: mapToAddress(defaultBillingAddress)?.zipcode,
            billingName: mapToAddress(defaultBillingAddress)?.billingName,
        }

        const placeOrder: IPlaceOrderRequest = {
            orderItems: orderItems,
            deliveryNotes: deliveryNotes,
            userShippingAddress: userShippingAddress,
            userBillingAddress: userBillingAddress
        }

        OrdersService.placeOrder(placeOrder)
            .then((response: any) => {
                LocalStorageService.removeItemsFromCart();
                navigate(`/order/${response.data?.id}`)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleDeliveryNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryNotes(event.target.value);
    };

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["Cart", "Shipping"]}/>
            <Paper elevation={3}
                   sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Shipping Address:</Typography>
                        <Divider/>
                        <List>
                            <ListItem>Country: {mapToAddress(defaultShippingAddress)?.country}</ListItem>
                            <ListItem>City: {mapToAddress(defaultShippingAddress)?.city}</ListItem>
                            <ListItem>State: {mapToAddress(defaultShippingAddress)?.state}</ListItem>
                            <ListItem>Street: {mapToAddress(defaultShippingAddress)?.street}</ListItem>
                            <ListItem>Phone Number: {mapToAddress(defaultShippingAddress)?.phoneNumber}</ListItem>
                            <ListItem>Zip Code: {mapToAddress(defaultShippingAddress)?.zipcode}</ListItem>
                            <ListItem>Recipient Name: {mapToAddress(defaultShippingAddress)?.recipientName}</ListItem>
                        </List>

                        <Button
                            variant="outlined"
                            onClick={() => setOpenEditShipping(true)}
                            style={{marginTop: '1rem'}}
                        >
                            Edit Default Shipping Address
                        </Button>
                        <EditShippingAddressModal
                            openEdit={openEditShipping}
                            address={defaultShippingAddress}
                            onSave={handleUpdatedAddress}
                            onClose={handleCloseModal}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Billing Address:</Typography>
                        <Divider/>
                        <List>
                            <ListItem>Country: {mapToAddress(defaultBillingAddress)?.country}</ListItem>
                            <ListItem>City: {mapToAddress(defaultBillingAddress)?.city}</ListItem>
                            <ListItem>State: {mapToAddress(defaultBillingAddress)?.state}</ListItem>
                            <ListItem>Street: {mapToAddress(defaultBillingAddress)?.street}</ListItem>
                            <ListItem>Phone Number: {mapToAddress(defaultBillingAddress)?.phoneNumber}</ListItem>
                            <ListItem>Zip Code: {mapToAddress(defaultBillingAddress)?.zipcode}</ListItem>
                            <ListItem>Billing Name: {mapToAddress(defaultBillingAddress)?.billingName}</ListItem>
                        </List>

                        <Button
                            variant="outlined"
                            onClick={() => setOpenEditBilling(true)}
                            style={{marginTop: '1rem'}}
                        >
                            Edit Default Billing Address
                        </Button>
                        <EditBillingAddressModal
                            openEdit={openEditBilling}
                            address={defaultBillingAddress}
                            onSave={handleUpdatedAddress}
                            onClose={handleCloseModal}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Items list:</Typography>
                        <Divider/>
                        <List>
                            {cartItems && cartItems.map((cartItem: IBooksData, index: number) => (
                                <ListItem key={index}>
                                    {cartItem?.title} {cartItem.quantity ? " (" + cartItem.quantity + " quantity)" : "(virtual)"}
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <CartSummary/>
                        <TextField
                            label="Provide Delivery Notes (Optional)"
                            multiline
                            onChange={handleDeliveryNotesChange}
                            value={deliveryNotes}
                            margin="normal"
                            helperText="If you have any notes regarding your order for us, type here; the message is saved automatically."
                        />
                        <Button variant="contained" color="primary" onClick={() => placeOrder()} fullWidth>
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ShippingScreen;