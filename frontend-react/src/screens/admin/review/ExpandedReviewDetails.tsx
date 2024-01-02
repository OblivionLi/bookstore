import React from 'react';
import {ExpanderComponentProps} from "react-data-table-component";
import IReviews from "../../../types/book/IReviews";
import {Divider, Paper, Typography} from "@mui/material";

const ExpandedReviewDetails: React.FC<ExpanderComponentProps<IReviews>> = ({data}) => {
    return (
        <Paper elevation={3}
               sx={{padding: 3, marginTop: 3, marginBottom: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Typography variant="h6" gutterBottom>Review:</Typography>
            <Divider/>
            <Typography variant="body2" gutterBottom>{data?.review}</Typography>
        </Paper>
    );
};

export default ExpandedReviewDetails;