import React from 'react';
import { ExpanderComponentProps } from "react-data-table-component";
import DataRow from "../../types/order/IDataRow";
import OrderLineItem from "../../types/order/IOrderLineItem";
import {Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

const ExpandedOrderDetails: React.FC<ExpanderComponentProps<DataRow>> = ({data}) => {
    return (
        <Box sx={{margin: 2}}>
            <Typography variant="h6" gutterBottom>Notes:</Typography>
            <p>{data?.notes}</p>
            <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 2, mb: 2}}/>

            <Typography variant="h6" gutterBottom>Shipping Address:</Typography>
            <ul>
                <li>Country: {data?.orderShippingAddress?.country || "Not provided"}</li>
                <li>City: {data?.orderShippingAddress?.city || "Not provided"}</li>
                <li>Street: {data?.orderShippingAddress?.street || "Not provided"}</li>
                <li>ZipCode: {data?.orderShippingAddress?.zipcode || "Not provided"}</li>
                <li>Recipient Name: {data?.orderShippingAddress?.recipientName || "Not provided"}</li>
            </ul>
            <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 2, mb: 2}}/>

            <Typography variant="h6" gutterBottom>Billing Address:</Typography>
            <ul>
                <li>Country: {data?.orderBillingAddress?.country || "Not provided"}</li>
                <li>City: {data?.orderBillingAddress?.city || "Not provided"}</li>
                <li>Street: {data?.orderBillingAddress?.street || "Not provided"}</li>
                <li>ZipCode: {data?.orderBillingAddress?.zipcode || "Not provided"}</li>
                <li>Recipient Name: {data?.orderBillingAddress?.billingName || "Not provided"}</li>
            </ul>
            <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 2, mb: 2}}/>

            <Typography variant="h6" gutterBottom>Order line items:</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Price per Unit</TableCell>
                            <TableCell>Total Price</TableCell>
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
        </Box>
    );
};

export default ExpandedOrderDetails;