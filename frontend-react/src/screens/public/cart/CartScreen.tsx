import React from 'react';
import MainNavbar from "../../../components/MainNavbar";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import LocalStorageService from "../../../services/LocalStorageService";
import IBooksData from "../../../types/IBooksData";
import {useNavigate} from "react-router-dom";
import BooksService from "../../../services/BooksService";

const CartScreen = () => {
    const navigate = useNavigate();
    const cartItems = LocalStorageService.getAllCartItems();
    const cartItemsCount = LocalStorageService.getCartItemCount();

    const removeItemFromCart = (id: number) => {
        const isItemDeleted = LocalStorageService.removeItemFromCart(id);
        if (isItemDeleted) {
            navigate("/cart")
        }
    }

    const showItemsSubtotal = () => {
        let subtotal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].quantity !== null) {
                subtotal += cartItems[i].price * cartItems[i].quantity;
            } else {
                subtotal += cartItems[i].price;
            }
        }

        return subtotal.toFixed(2);
    }

    const showItemsTotal = () => {
        let subtotal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].quantity !== null) {
                subtotal += BooksService.calculateBookPrice(cartItems[i].price, cartItems[i].discount) * cartItems[i].quantity;
            } else {
                subtotal += BooksService.calculateBookPrice(cartItems[i].price, cartItems[i].discount);
            }
        }

        return subtotal.toFixed(2);
    }

    return (
        <>
            <MainNavbar/>
            <Breadcrumb page={"Cart"}/>
            <hr/>
            <div className="container-fluid">
                {cartItemsCount > 0 ? (
                    <div className="row">
                        <div className="col">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems && cartItems.map((cartItem: IBooksData, index: number) => (
                                    <tr key={index}>
                                        <td>{cartItem?.title}</td>
                                        <td>{cartItem?.discount} %</td>
                                        <td>
                                            <del>{cartItem?.price} &euro;</del>
                                            | {BooksService.calculateBookPrice(cartItem?.price, cartItem?.discount).toFixed(2)} &euro;
                                        </td>
                                        <td>{cartItem.quantity ? cartItem.quantity : "Virtual"}</td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => removeItemFromCart(cartItem?.id)}>Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col">
                            <h4>Subtotal</h4>
                            <p>{showItemsSubtotal()} &euro;</p>
                            <hr/>
                            <h4>Total with discount</h4>
                            <p>{showItemsTotal()} &euro;</p>
                            <hr/>
                            <button className="btn btn-primary">Proceed to checkout</button>
                        </div>
                    </div>
                ) : (
                    <p>Cart is empty. Please add at least 1 item to check your cart list.</p>
                )}
            </div>
        </>
    );
};

export default CartScreen;