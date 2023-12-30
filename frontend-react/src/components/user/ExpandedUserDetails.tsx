import React from 'react';
import {ExpanderComponentProps} from "react-data-table-component";
import IUserResponse from "../../types/user/IUserResponse";
import {
    Box,
    Grid,
    List,
    ListItem,
    Paper,
    Typography
} from "@mui/material";

const ExpandedUserDetails: React.FC<ExpanderComponentProps<IUserResponse>> = ({data}) => {
    return (
        <Paper elevation={3}
               sx={{padding: 3, marginTop: 3, marginBottom: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Box sx={{margin: 2}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Shipping Address:</Typography>
                        {data.userShippingAddress ? (
                            <List>
                                <ListItem>Country: {data?.userShippingAddress?.country || "Not provided"}</ListItem>
                                <ListItem>City: {data?.userShippingAddress?.city || "Not provided"}</ListItem>
                                <ListItem>Street: {data?.userShippingAddress?.street || "Not provided"}</ListItem>
                                <ListItem>ZipCode: {data?.userShippingAddress?.zipcode || "Not provided"}</ListItem>
                                <ListItem>Recipient
                                    Name: {data?.userShippingAddress?.recipientName || "Not provided"}</ListItem>
                            </List>
                        ) : (
                            <Typography variant="subtitle2" gutterBottom>There's no shipping address assigned to the
                                user.</Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Billing Address:</Typography>
                        {data.userBillingAddresses ? (
                            <List>
                                <ListItem>Country: {data?.userBillingAddresses?.country || "Not provided"}</ListItem>
                                <ListItem>City: {data?.userBillingAddresses?.city || "Not provided"}</ListItem>
                                <ListItem>Street: {data?.userBillingAddresses?.street || "Not provided"}</ListItem>
                                <ListItem>ZipCode: {data?.userBillingAddresses?.zipcode || "Not provided"}</ListItem>
                                <ListItem>Recipient
                                    Name: {data?.userBillingAddresses?.billingName || "Not provided"}</ListItem>
                            </List>
                        ) : (
                            <Typography variant="subtitle2" gutterBottom>There's no billing address assigned to the
                                user.</Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default ExpandedUserDetails;