import React from 'react';
import {ExpanderComponentProps} from "react-data-table-component";
import IBooksData from "../../../types/book/IBooksData";
import {Box, Divider, Grid, List, ListItem, Paper, Typography} from "@mui/material";

const ExpandedUserDetails: React.FC<ExpanderComponentProps<IBooksData>> = ({data}) => {
    return (
        <Paper elevation={3}
               sx={{padding: 3, marginTop: 3, marginBottom: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Typography variant="h6" gutterBottom>No. of pages: {data?.pages}</Typography>
            <Divider/>
            <Box sx={{margin: 2}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Authors: </Typography>
                        <List>
                            {data.authors.map((author, index) => (
                                <ListItem key={index}>
                                    {author}
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Genres: </Typography>
                        <List>
                            {data.genres.map((genre, index) => (
                                <ListItem key={index}>
                                    {genre}
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Description: </Typography>
                        <Typography variant="body2" gutterBottom>{data?.description}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default ExpandedUserDetails;