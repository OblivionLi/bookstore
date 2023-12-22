import React from 'react';
import {Grid, Skeleton} from "@mui/material";

const AddressSkeleton = () => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
        </Grid>
    );
};

export default AddressSkeleton;