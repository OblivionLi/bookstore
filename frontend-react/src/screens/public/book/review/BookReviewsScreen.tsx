import React, {useEffect, useState} from 'react';
import BooksService from "../../../../services/BooksService";
import IBookReviews from "../../../../types/book/IBookReviews";
import "../../../../styles.css";
import StarRating from "../../../../components/Rating";
import MultiUsePagination from "../../../../components/MultiUsePagination";
import LocalStorageService from "../../../../services/LocalStorageService";
import {Button, Divider, Paper, Rating, TextField} from "@mui/material";

const BookReviewsScreen = ({bookId}: { bookId: number | undefined }) => {
    const [reviews, setReviews] = useState<Array<IBookReviews>>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const isUserLogged = LocalStorageService.isUserLogged();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState<number | null>(1);

    useEffect(() => {
        fetchReviews();
    }, [currentPage, bookId]);

    const fetchReviews = () => {
        if (bookId) {
            BooksService.getBookReviews(bookId, currentPage)
                .then((response: any) => {
                    setReviews(response.data?.content);
                    setTotalPages(response.data?.totalPages)
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    const handleSubmit = () => {
        if (isUserLogged && reviewText && rating && bookId) {
            BooksService.addBookReview(bookId, reviewText, rating)
                .then((response: any) => {
                    setReviewText('');
                    setRating(0);
                    setCurrentPage(0);
                    fetchReviews();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }

    return (
        <>
            {isUserLogged && (<>
                <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}>
                    <div>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue || 0);
                            }}
                        />
                    </div>

                    <TextField
                        id="standard-multiline-static"
                        label="Write your review here.."
                        multiline
                        rows={3}
                        value={reviewText}
                        onChange={(event) => {
                            setReviewText(event.target.value);
                        }}
                        variant="standard"
                        style={{marginTop: "1rem"}}
                    />

                    <Button type="submit" variant="contained" color="primary" style={{marginTop: "1rem"}}>Send
                        review</Button>
                </form>
            </>)}

            <Paper style={{padding: "2rem"}}>
                {reviews.length > 0 ? reviews.map((review, index) => (
                    <>
                        <div className="review" key={index}>
                            <p><b>{review?.username}</b> added at: {new Date(review?.createdAt).toLocaleString()}</p>
                            <span><StarRating averageRating={review?.rating || 0}/></span>
                            <Divider style={{marginTop: ".5rem"}}/>
                            <p style={{marginTop: "1rem"}}>{review?.review}</p>
                        </div>
                        <MultiUsePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )) : (
                    <p>This book has no reviews yet.</p>
                )}
            </Paper>
        </>
    );
};

export default BookReviewsScreen;