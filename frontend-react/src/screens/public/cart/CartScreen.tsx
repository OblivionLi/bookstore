import React from 'react';
import MainNavbar from "../../../components/MainNavbar";
import LocalStorageService from "../../../services/LocalStorageService";
import IBooksData from "../../../types/book/IBooksData";
import {Link, useNavigate} from "react-router-dom";
import BooksService from "../../../services/BooksService";
import CartSummary from "../../../components/cart/CartSummary";
import BreadcrumbMulti from "../../../components/breadcrumb/BreadcrumbMulti";
import {Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from "@mui/material";
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

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

    const increaseQuantity = (id: number) => {
        const isItemUpdated = LocalStorageService.increaseItemQuantity(id);
        if (isItemUpdated) {
            navigate("/cart");
        }
    };

    const decreaseQuantity = (id: number) => {
        const isItemUpdated = LocalStorageService.decreaseItemQuantity(id);
        if (isItemUpdated) {
            navigate("/cart");
        }
    };

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["Cart"]}/>

            <Paper elevation={3}
                   sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                {cartItemsCount > 0 ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Discount</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell className="text-right">Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems && cartItems.map((cartItem: IBooksData, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{cartItem?.title}</TableCell>
                                                <TableCell>{cartItem?.type}</TableCell>
                                                <TableCell>{cartItem?.discount} %</TableCell>
                                                <TableCell>
                                                    <del>{cartItem?.price} &euro;</del>
                                                    | {BooksService.calculateBookPrice(cartItem?.price, cartItem?.discount).toFixed(2)} &euro;
                                                </TableCell>
                                                <TableCell
                                                    className="text-right">
                                                    {cartItem.type === 'physical' ? cartItem.quantity == 1 ? (
                                                        <>
                                                            {cartItem.quantity}
                                                            <IconButton color="primary" size="small" onClick={() => increaseQuantity(cartItem?.id)}>
                                                                <ArrowUpward fontSize="inherit" />
                                                            </IconButton>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {cartItem.quantity}
                                                            <IconButton color="primary" size="small" onClick={() => increaseQuantity(cartItem?.id)}>
                                                                <ArrowUpward fontSize="inherit" />
                                                            </IconButton>
                                                            <IconButton color="primary" size="small" onClick={() => decreaseQuantity(cartItem?.id)}>
                                                                <ArrowDownward fontSize="inherit" />
                                                            </IconButton>
                                                        </>
                                                    ) : "Virtual"}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="secondary"
                                                            onClick={() => removeItemFromCart(cartItem?.id)}>Remove</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CartSummary/>
                            <Button variant="contained" color="primary" style={{marginTop: '8px'}}>
                                <Link to={'/cart/shipping'} style={{textDecoration: 'none', color: 'inherit'}}>Proceed
                                    to checkout</Link>
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <p>Cart is empty. Please add at least 1 item to check your cart list.</p>
                )}
            </Paper>
        </>
    );
};

export default CartScreen;