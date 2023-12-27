import React, {useEffect, useState} from 'react';
import IBooksData from "../../../types/book/IBooksData";
import BooksService from "../../../services/BooksService";
import {useParams} from "react-router-dom";
import MainNavbar from "../../../components/MainNavbar";
import "../../../styles.css";
import BookReviewsScreen from "./review/BookReviewsScreen";
import StarRating from "../../../components/Rating";
import LocalStorageService from "../../../services/LocalStorageService";
import BreadcrumbMulti from "../../../components/breadcrumb/BreadcrumbMulti";
import {Button, Divider, Paper, Skeleton} from "@mui/material";

const ShowBookScreen = () => {
    const {slug} = useParams<{ slug: string }>();
    const [book, setBook] = useState<IBooksData | undefined>();
    const [bookPriceWithDiscount, setBookPriceWithDiscount] = useState("0.00");
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchBook();

            const itemInCart = LocalStorageService.isItemInCart(slug)
            setIsInCart(itemInCart);
        }
    }, [slug]);

    const fetchBook = () => {
        BooksService.getBookById(slug!)
            .then((response: any) => {
                const bookData: IBooksData = response?.data;
                setBook(bookData);

                const discountedPrice = BooksService.calculateBookPrice(
                    bookData?.price,
                    bookData?.discount
                );

                setBookPriceWithDiscount(discountedPrice.toFixed(2));
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
                setLoading(false);
            });
    }

    const addToCart = () => {
        const cartItemCount = LocalStorageService.getCartItemCount();

        if (book && cartItemCount < 15 && !isInCart) {
            LocalStorageService.addItemToCartStorage(book);
            setIsInCart(true);
        } else {
            console.log("Couldn't find book to add to cart storage.")
        }
    }

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={[book?.title || "Missing"]}/>
            {loading ?
                <Paper sx={{padding: 3, marginTop: 3, width: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Skeleton variant="rectangular" height={250}/>
                    <Skeleton variant="text" height={40}/>
                    <Skeleton variant="text" height={40}/>
                    <Skeleton variant="text" height={40}/>
                    <Skeleton variant="text" height={40}/>
                    <Skeleton variant="rectangular" height={250}/>
                </Paper> :
                <Paper elevation={3}
                       sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <div className="book-details-section-1">
                        <div className="book-image">
                            <img src="https://placehold.co/600x400/EEE/31343C" alt=""/>
                        </div>
                        <div className="book-rating">
                            Rating: <StarRating averageRating={book?.averageBookRating || 0}/>
                            <p>No. of reviews: {book?.ratings.length}</p>
                        </div>
                        <div className="book-checkout">
                            <p>Title: {book?.title} (publication year: {book?.publicationYear})</p>
                            <p>Authors: {book?.authors.join(", ")}</p>
                            <p>ISBN: {book?.isbn}</p>
                            <p>Discount: {book?.discount} %</p>
                            <p>Price: <del>{book?.price} &euro;</del> | {bookPriceWithDiscount} &euro;</p>
                            <Button style={{width: "100%"}} variant="contained" color="success" disabled={isInCart}
                                    onClick={() => addToCart()}>
                                {isInCart ? 'Already in cart' : 'Add to cart'}
                            </Button>
                        </div>
                    </div>
                    <Divider sx={{mt: 3}}/>
                    <div className="book-details-section-2">
                        <div className="book-information">
                            <p>Type: {book?.type}</p>
                            <p>Genres: {book?.genres.join(", ")}</p>
                            <p>Pages: {book?.pages}</p>
                            <p>Date Release: {book?.releaseDate}</p>
                            <p>Publisher: {book?.publisher}</p>
                            <p>File Format: {book?.fileFormat || "paper"}</p>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="book-description">
                            <p>Description: {book?.description}</p>
                        </div>
                    </div>
                    <Divider sx={{mt: 3}}/>
                    <div className="book-reviews">
                        <BookReviewsScreen bookId={book?.id}/>
                    </div>
                </Paper>}
        </>
    );
};

export default ShowBookScreen;