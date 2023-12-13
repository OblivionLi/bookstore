import React, {useEffect, useState} from 'react';
import BooksService from "../../../../services/BooksService";
import Pagination from "../../../../components/Pagination";
import IBookReviews from "../../../../types/book/IBookReviews";
import "../../../../styles.css";
import StarRating from "../../../../components/Rating";

const BookReviews = ({bookId}: { bookId: number | undefined }) => {
    const [reviews, setReviews] = useState<Array<IBookReviews>>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, [currentPage, bookId]);

    const fetchReviews = () => {
        console.log("FROM FETCH REVIEWS")
        if (bookId) {
            BooksService.getBookReviews(bookId, currentPage)
                .then((response: any) => {
                    setReviews(response.data?.content);
                    setTotalPages(response.data?.totalPages)
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row g-2 justify-content-center">
                    {reviews && reviews.map((review, index) => (
                        <div className="review" key={index}>
                            <p>{review?.username} added at: {new Date(review?.createdAt).toLocaleString()}</p>
                            Rating: <StarRating averageRating={review?.rating || 0} />
                            <p>{review?.review}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default BookReviews;