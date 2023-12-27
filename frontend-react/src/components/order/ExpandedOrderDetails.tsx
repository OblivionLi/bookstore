import React from 'react';
import {ExpanderComponentProps} from "react-data-table-component";
import DataRow from "../../types/order/IDataRow";
import OrderLineItem from "../../types/order/IOrderLineItem";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ListItem, List, Grid
} from "@mui/material";

const ExpandedOrderDetails: React.FC<ExpanderComponentProps<DataRow>> = ({data}) => {
    return (
        <Paper elevation={3}
               sx={{padding: 3, marginTop: 3, marginBottom: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Box sx={{margin: 2}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Shipping Address:</Typography>
                        <List>
                            <ListItem>Country: {data?.orderShippingAddress?.country || "Not provided"}</ListItem>
                            <ListItem>City: {data?.orderShippingAddress?.city || "Not provided"}</ListItem>
                            <ListItem>Street: {data?.orderShippingAddress?.street || "Not provided"}</ListItem>
                            <ListItem>ZipCode: {data?.orderShippingAddress?.zipcode || "Not provided"}</ListItem>
                            <ListItem>Recipient
                                Name: {data?.orderShippingAddress?.recipientName || "Not provided"}</ListItem>
                        </List>
                        <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 2, mb: 2}}/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Billing Address:</Typography>
                        <List>
                            <ListItem>Country: {data?.orderBillingAddress?.country || "Not provided"}</ListItem>
                            <ListItem>City: {data?.orderBillingAddress?.city || "Not provided"}</ListItem>
                            <ListItem>Street: {data?.orderBillingAddress?.street || "Not provided"}</ListItem>
                            <ListItem>ZipCode: {data?.orderBillingAddress?.zipcode || "Not provided"}</ListItem>
                            <ListItem>Recipient Name: {data?.orderBillingAddress?.billingName || "Not provided"}</ListItem>
                        </List>
                        <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 2, mb: 2}}/>
                    </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>Order line items:</Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Discount (%)</TableCell>
                                <TableCell>Price per Unit (&euro;)</TableCell>
                                <TableCell>Total Price (&euro;)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.orderLineItems && data?.orderLineItems.map((orderLineItem: OrderLineItem, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{orderLineItem?.bookTitle}</TableCell>
                                    <TableCell>{orderLineItem?.bookType}</TableCell>
                                    <TableCell>{orderLineItem?.quantity}</TableCell>
                                    <TableCell>{orderLineItem?.discount}</TableCell>
                                    <TableCell>{orderLineItem?.pricePerUnit}</TableCell>
                                    <TableCell>{orderLineItem?.totalPrice.toFixed(2)} &euro;</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 2, mb: 2}}/>

                <Typography variant="h6" gutterBottom>Notes:</Typography>
                <p>{data?.notes}</p>
            </Box>
        </Paper>
    );
};

export default ExpandedOrderDetails;