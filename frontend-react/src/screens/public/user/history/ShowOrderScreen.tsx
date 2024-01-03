import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
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
    TableBody, Grid, Card, CardContent, makeStyles, Theme, Chip
} from "@mui/material";

const ShowOrderScreen = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const [order, setOrder] = useState<IOrdersData | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = () => {
        if (id) {
            OrdersService.getOrder(id)
                .then((response: any) => {
                    const orderData: IOrdersData = response?.data;
                    if (!orderData) {
                        navigate("/orders-history");
                    }

                    setOrder(orderData);
                    setLoading(false);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["Orders-History", `Order ${order?.orderId}`]}/>

            {loading ? (
                <p>Loading...</p>
            ) : (
                order && (
                    <Grid container justifyContent="center">
                        <Paper elevation={3}
                               sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                            <Typography variant="h5">Order Details for Order ID: {order?.orderId}</Typography>
                            <Divider sx={{margin: '20px 0'}}/>

                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="h5" display="inline">Order Status:</Typography>
                                    <Chip
                                        label={order?.orderStatus}
                                        style={{
                                            marginLeft: '10px',
                                            backgroundColor: order?.orderStatus === 'Completed' ? 'green' : 'default',
                                            color: order?.orderStatus === 'Completed' ? 'white' : 'black'
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <Typography variant="h5" display="inline">Payment Status:</Typography>
                                    <Chip
                                        label={order?.paymentStatus}
                                        style={{
                                            marginLeft: '10px',
                                            backgroundColor: order?.paymentStatus === 'Payed' ? 'green' : 'default',
                                            color: order?.paymentStatus === 'Payed' ? 'white' : 'black'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Divider sx={{margin: '20px 0'}}/>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} style={{display: 'flex'}}>
                                    <Card style={{margin: '20px 0', flex: 1}}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Billing Address:</Typography>
                                            <Divider sx={{margin: '20px 0'}}/>
                                            <List>
                                                <ListItem><ListItemText
                                                    primary={`Country: ${order.orderBillingAddress.country}`}/></ListItem>
                                                <ListItem><ListItemText
                                                    primary={`City: ${order.orderBillingAddress.city}`}/></ListItem>
                                                <ListItem><ListItemText
                                                    primary={`Street: ${order.orderBillingAddress.street}`}/></ListItem>
                                                <ListItem><ListItemText
                                                    primary={`Zip Code: ${order.orderBillingAddress.zipcode}`}/></ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} style={{display: 'flex'}}>
                                    <Card style={{margin: '20px 0', flex: 1}}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Shipping Address:</Typography>
                                            <Divider sx={{margin: '20px 0'}}/>
                                            <List>
                                                <ListItem><ListItemText
                                                    primary={`Country: ${order.orderShippingAddress.country}`}/></ListItem>
                                                <ListItem><ListItemText
                                                    primary={`City: ${order.orderShippingAddress.city}`}/></ListItem>
                                                <ListItem><ListItemText
                                                    primary={`Street: ${order.orderShippingAddress.street}`}/></ListItem>
                                                <ListItem><ListItemText
                                                    primary={`Zip Code: ${order.orderShippingAddress.zipcode}`}/></ListItem>
                                                <ListItem><ListItemText
                                                    primary={`Phone Number: ${order.orderShippingAddress.phoneNumber}`}/></ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Divider sx={{margin: '20px 0'}}/>

                            <Typography variant="h6">Order Line Items</Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Price Per Unit &euro;</TableCell>
                                            <TableCell>Discount %</TableCell>
                                            <TableCell>Quantity</TableCell>
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
                                                <TableCell>{item.bookType != 'physical' ? 'virtual' : item.quantity}</TableCell>
                                                <TableCell>{item.totalPrice.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider sx={{margin: '20px 0'}}/>


                            <Typography variant="h6" color="textSecondary">Total Order Price:</Typography>
                            <Typography variant="subtitle1" display="block"
                                        gutterBottom>Subtotal: {order.subtotal} &euro; + Tax {order.taxAmount} &
                                &euro; + Shipping Cost {order.shippingCost} &euro;
                            </Typography>
                            <Typography variant="h4" color="secondary">
                                {order.totalPrice.toFixed(2)} &euro;
                            </Typography>
                        </Paper>
                    </Grid>
                )
            )}
        </>
    );
};

export default ShowOrderScreen;