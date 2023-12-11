import React, {useEffect, useState} from 'react';
import IBooksData from "../../../types/IBooksData";
import BooksService from "../../../services/BooksService";
import {useParams} from "react-router-dom";
import MainNavbar from "../../../components/MainNavbar";
import "../../../styles.css";
import BookReviews from "./review/BookReviews";
import StarRating from "../../../components/Rating";
import Spinner from "../../../components/Spinner";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import LocalStorageService from "../../../services/LocalStorageService";

const ShowBook = () => {
    const {id} = useParams<{ id: string }>();
    const [book, setBook] = useState<IBooksData | undefined>();
    const [bookPriceWithDiscount, setBookPriceWithDiscount] = useState("0.00");
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (id) {
            fetchBook();

            const itemInCart = LocalStorageService.isItemInCart(parseInt(id))
            setIsInCart(itemInCart);
        }
    }, [id]);

    const fetchBook = () => {
        BooksService.getBookById(id!)
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

    if (loading) {
        return <div className="spinner"><Spinner /></div>;
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
            <Breadcrumb page={book?.title || "Book title not found!"} />
            <hr/>
            <div className="container-fluid">
                <div className="book-details-section-1">
                    <div className="book-image">
                        <img src="https://placehold.co/600x400/EEE/31343C" alt=""/>
                    </div>
                    <div className="book-rating">
                        Rating: <StarRating averageRating={book?.averageBookRating || 0} />
                        <p>No. of reviews: {book?.ratings.length}</p>
                    </div>
                    <div className="book-checkout">
                        <p>Title: {book?.title} (publication year: {book?.publicationYear})</p>
                        <p>Authors: {book?.authors.join(", ")}</p>
                        <p>ISBN: {book?.isbn}</p>
                        <p>Discount: {book?.discount} %</p>
                        <p>Price: <del>{book?.price} &euro;</del> | {bookPriceWithDiscount} &euro;</p>
                        <button type="button" className={isInCart ? 'btn btn-secondary' : 'btn btn-outline-success'} onClick={() => addToCart()} disabled={isInCart}>
                            {isInCart ? 'In cart' : 'Add to cart'}
                        </button>
                    </div>
                </div>
                <hr/>
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
                <hr/>
                <div className="book-reviews">
                    {book && book?.ratings && book?.ratings.length > 0 ? (
                        <BookReviews bookId={book.id} />
                    ) : (
                        <p>This book has no reviews yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShowBook;