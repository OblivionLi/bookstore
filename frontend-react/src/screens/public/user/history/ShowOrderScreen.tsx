import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import IOrdersData from "../../../../types/order/IOrdersData";
import OrdersService from "../../../../services/OrdersService";
import MainNavbar from "../../../../components/MainNavbar";
import BreadcrumbMulti from "../../../../components/breadcrumb/BreadcrumbMulti";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Table,
    Typography,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody
} from "@mui/material";

const ShowOrderScreen = () => {
    const {id} = useParams<{ id: string }>();
    const [order, setOrder] = useState<IOrdersData | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    const fetchOrder = () => {
        OrdersService.getOrder(parseInt(id!))
            .then((response: any) => {
                const orderData: IOrdersData = response?.data;
                console.log(orderData);
                setOrder(orderData);
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["Orders-History", `Order ${order?.id}`]}/>

            {loading ?
                (<p>Loading...</p>) :
                order && (
                    <Paper elevation={3}
                           sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Typography variant="h5">Order Details for Order ID: {id}</Typography>
                        <Divider sx={{margin: '20px 0'}}/>

                        <Typography variant="h6">Sending to: {order.orderShippingAddress.recipientName}</Typography>
                        <Divider sx={{margin: '20px 0'}}/>

                        <Typography variant="h6">Billing Address</Typography>
                        <List>
                            <ListItem><ListItemText primary={`Country: ${order.orderBillingAddress.country}`}/></ListItem>
                            <ListItem><ListItemText primary={`City: ${order.orderBillingAddress.city}`}/></ListItem>
                            <ListItem><ListItemText primary={`Street: ${order.orderBillingAddress.street}`}/></ListItem>
                            <ListItem><ListItemText primary={`Zip Code: ${order.orderBillingAddress.zipcode}`}/></ListItem>
                        </List>
                        <Divider sx={{margin: '20px 0'}}/>

                        <Typography variant="h6">Shipping Address</Typography>
                        <List>
                            <ListItem><ListItemText primary={`Country: ${order.orderShippingAddress.country}`}/></ListItem>
                            <ListItem><ListItemText primary={`City: ${order.orderShippingAddress.city}`}/></ListItem>
                            <ListItem><ListItemText primary={`Street: ${order.orderShippingAddress.street}`}/></ListItem>
                            <ListItem><ListItemText primary={`Zip Code: ${order.orderShippingAddress.zipcode}`}/></ListItem>
                            <ListItem><ListItemText primary={`Phone Number: ${order.orderShippingAddress.phoneNumber}`}/></ListItem>
                        </List>
                        <Divider sx={{margin: '20px 0'}}/>

                        <Typography variant="h6">Order Line Items</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price Per Unit</TableCell>
                                        <TableCell>Discount %</TableCell>
                                        <TableCell>Total Price &euro;</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.orderLineItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.bookTitle}</TableCell>
                                            <TableCell>{item.bookType}</TableCell>
                                            <TableCell>{item.pricePerUnit}</TableCell>
                                            <TableCell>{item.discount}</TableCell>
                                            <TableCell>{item.totalPrice.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                )
            }
        </>
    );
};

export default ShowOrderScreen;