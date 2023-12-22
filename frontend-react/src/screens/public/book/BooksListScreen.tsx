import React, {useEffect, useState} from 'react';
import BooksService from "../../../services/BooksService";
import '../../../styles.css'
import IBooksData from "../../../types/book/IBooksData";
import LocalStorageService from "../../../services/LocalStorageService";
import BookFilters from "./filter/BookFilters";
import MultiUsePagination from "../../../components/MultiUsePagination";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";

const Div = styled('div')(({theme}) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));

function BooksListScreen() {
    const [books, setBooks] = useState<Array<IBooksData>>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [userPermission, setUserPermission] = useState(["ROLE_ANONYMOUS"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
        getUserPermissions();
    }, [currentPage]);

    const getUserPermissions = () => {
        setUserPermission(prevUserPermission => {
            return LocalStorageService.getUserPermissions();
        });
    }

    const fetchBooks = () => {
        BooksService.getAllBooks(currentPage)
            .then((response: any) => {
                setBooks(response.data?.content);
                setTotalPages(response.data?.totalPages)
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    const bookSkeleton = (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="rectangular" height={118} style={{marginBottom: '1rem'}}/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
        </Grid>
    );

    return (
        <Paper elevation={3} style={{padding: '3rem', margin: '2rem'}}>
            <BookFilters/>

            <Grid container spacing={2} justifyContent="center">
                {loading ? Array.from(new Array(9)).map((_, index) => <>{bookSkeleton}</>) :
                    books && books.map((book, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} justifyContent="center">
                            <Card sx={{maxWidth: 345, marginLeft: 'auto', marginRight: 'auto'}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="https://placehold.co/600x400"
                                        alt={book?.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {book?.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {book?.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{justifyContent: "space-between"}}>
                                    <Button size="small" color="primary">
                                        <Link to={`/books/${book?.id}`} color="primary" style={{textDecoration: "none"}}>
                                            View Book
                                        </Link>
                                    </Button>
                                    <Div>
                                        <del>{book?.price} &euro;</del>
                                        | {BooksService.calculateBookPrice(book?.price, book?.discount).toFixed(2)} &euro;
                                    </Div>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            <MultiUsePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Paper>
    );
}

export default BooksListScreen;