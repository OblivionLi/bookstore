import React, {useEffect, useState} from 'react';
import MainNavbar from "../../../components/MainNavbar";
import BreadcrumbMulti from "../../../components/breadcrumb/BreadcrumbMulti";
import CartSummary from "../../../components/cart/CartSummary";
import LocalStorageService from "../../../services/LocalStorageService";
import {Link} from "react-router-dom";
import IBooksData from "../../../types/IBooksData";
import UsersService from "../../../services/UsersService";
import EditShippingAddressModal from "../../../components/address/EditShippingAddressModal";
import IUserDefaultAddress from "../../../types/IUserDefaultAddress";
import EditBillingAddressModal from "../../../components/address/EditBillingAddressModal";
import IOrderItemRequest from "../../../types/IOrderItemRequest";
import IUserShippingAddressRequest from "../../../types/IUserShippingAddressRequest";
import IUserBillingAddressRequest from "../../../types/IUserBillingAddressRequest";
import IPlaceOrderRequest from "../../../types/IPlaceOrderRequest";

const ShippingScreen = () => {
    const cartItems = LocalStorageService.getAllCartItems();
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(null);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
    const [deliveryNotes, setDeliveryNotes] = useState("");

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
    };

    const placeOrder = () => {
        let orderItems: IOrderItemRequest[] = [];

        for (let i = 0; i < cartItems.length; i++) {
            const orderItem: IOrderItemRequest = {
                itemId: cartItems[i].id,
                quantity: cartItems[i].quantity,
                itemPrice: cartItems[i].itemPrice,
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
            deliveryNotes: deliveryNotes
        }

        const userBillingAddress: IUserBillingAddressRequest = {
            street: mapToAddress(defaultShippingAddress)?.street,
            city: mapToAddress(defaultShippingAddress)?.city,
            state: mapToAddress(defaultShippingAddress)?.state,
            country: mapToAddress(defaultShippingAddress)?.country,
            phoneNumber: mapToAddress(defaultShippingAddress)?.phoneNumber,
            zipcode: mapToAddress(defaultShippingAddress)?.zipcode,
            billingName: mapToAddress(defaultShippingAddress)?.billingName,
        }

        const placeOrder: IPlaceOrderRequest = {
            orderItems: orderItems,
            userShippingAddress: userShippingAddress,
            userBillingAddress: userBillingAddress
        }

        console.log(placeOrder);
        // send placeOrder
    }

    const handleDeliveryNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryNotes(event.target.value);
    };

    console.log(deliveryNotes)
    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["Cart", "Shipping"]}/>
            <hr/>
            <div className="container-fluid">
                <h3>Please make sure your default addresses are correct. You can change you default address in your
                    account settings.</h3>
                <div className="row">
                    <div className="col">
                        <h4>Shipping Address:</h4>
                        <hr/>
                        <div className="list-group">
                            <button type="button"
                                    className="list-group-item list-group-item-action">Country: {mapToAddress(defaultShippingAddress)?.country}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">City: {mapToAddress(defaultShippingAddress)?.city}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">State: {mapToAddress(defaultShippingAddress)?.state}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Street: {mapToAddress(defaultShippingAddress)?.street}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Phone: {mapToAddress(defaultShippingAddress)?.phoneNumber}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Zip: {mapToAddress(defaultShippingAddress)?.zipcode}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Recipient: {mapToAddress(defaultShippingAddress)?.recipientName}</button>


                            <div className="mb-3">
                                <label htmlFor="deliveryNotes" className="form-label">Delivery Notes</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="deliveryNotes"
                                    aria-describedby="deliveryNotesHelp"
                                    value={deliveryNotes}
                                    onChange={handleDeliveryNotesChange}
                                />
                                <div id="deliveryNotes" className="form-text">If you have any notes regarding your
                                    order for us, type here; the message is saved automatically.
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#editShippingAddressModal"
                            >
                                Edit Default Shipping Address
                            </button>
                            <EditShippingAddressModal address={defaultShippingAddress} onSave={handleUpdatedAddress}
                                                      onClose={handleCloseModal}/>
                        </div>
                    </div>

                    <div className="col">
                        <h4>Billing Address:</h4>
                        <hr/>
                        <div className="list-group">
                            <button type="button"
                                    className="list-group-item list-group-item-action">Country: {mapToAddress(defaultBillingAddress)?.country}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">City: {mapToAddress(defaultBillingAddress)?.city}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">State: {mapToAddress(defaultBillingAddress)?.state}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Street: {mapToAddress(defaultBillingAddress)?.street}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Phone: {mapToAddress(defaultBillingAddress)?.phoneNumber}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Zip: {mapToAddress(defaultBillingAddress)?.zipcode}</button>
                            <button type="button"
                                    className="list-group-item list-group-item-action">Recipient: {mapToAddress(defaultBillingAddress)?.billingName}</button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#editBillingAddressModal"
                            >
                                Edit Default Billing Address
                            </button>
                            <EditBillingAddressModal address={defaultBillingAddress} onSave={handleUpdatedAddress}
                                                     onClose={handleCloseModal}/>
                        </div>
                    </div>

                    <div className="col">
                        <h4>Items list:</h4>
                        <ul>
                            {cartItems && cartItems.map((cartItem: IBooksData, index: number) => (
                                <li key={index}>
                                    {cartItem?.title} {cartItem.quantity ? " (" + cartItem.quantity + " quantity)" : ""}
                                </li>
                            ))}
                        </ul>
                        <hr/>
                        <CartSummary/>
                        <button className="btn btn-primary" onClick={() => placeOrder()}>
                            <Link to={'/cart/placeorder'}>Place Order</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingScreen;