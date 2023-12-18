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
import {Button, Modal} from "react-bootstrap";
import IPlaceOrderResponse from "../../../types/order/IPlaceOrderResponse";
import {Link, useNavigate} from "react-router-dom";

const ShippingScreen = () => {
    const navigate = useNavigate();
    const cartItems = LocalStorageService.getAllCartItems();
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(null);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<IPlaceOrderResponse | null>(null);

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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModalSuccess = () => {
        setShowModal(false);
        navigate("/user-history")
    }

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
                setModalContent(response.data as IPlaceOrderResponse);
                handleShowModal();
                LocalStorageService.removeItemsFromCart();
                navigate(`/order/${response.data?.orderId}`)
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
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

            {/*<Modal show={showModal} onHide={handleCloseModalSuccess}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Order Placed with Success</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        {modalContent && (*/}
            {/*            <div>*/}
            {/*                <h4>Your physical items will be delivered at:</h4>*/}
            {/*                <p>{modalContent.country}, {modalContent.city}, {modalContent.street}, {modalContent.zipcode}</p>*/}
            {/*                <hr/>*/}
            {/*                <h4>For recipient:</h4>*/}
            {/*                <p>{modalContent.recipientName}, {modalContent.phoneNumber}</p>*/}
            {/*                <hr/>*/}
            {/*                <p>Taxes: {modalContent.shippingCost} &euro; (shipping cost) + {modalContent.taxAmount} &euro; (tax)</p>*/}
            {/*                <hr/>*/}
            {/*                <p>Total: {modalContent.orderTotal.toFixed(2)} &euro;</p>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={handleCloseModalSuccess}>*/}
            {/*            Confirm*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </>
    );
};

export default ShippingScreen;