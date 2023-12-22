import React from 'react';
import {Link} from "react-router-dom";
import BooksService from "../../services/BooksService";
import LocalStorageService from "../../services/LocalStorageService";
import {Divider} from "@mui/material";

const CartSummary = () => {
    const cartItems = LocalStorageService.getAllCartItems();

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
            <h4>Subtotal</h4>
            <p>{showItemsSubtotal()} &euro;</p>
            <Divider/>
            <h4>Total with discount</h4>
            <p>{showItemsTotal()} &euro;</p>
            <Divider/>
        </>
    );
};

export default CartSummary;