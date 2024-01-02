import axios from "axios";
import IBooksData from "../types/book/IBooksData";
import IBookReviews from "../types/book/IBookReviews";
import LocalStorageService from "./LocalStorageService";
import IReviewEditRequest from "../types/book/IReviewEditRequest";

const getAllBooks = (page: number) => {
    return axios.get<Array<IBooksData>>(`/api/book?page=${page}`);
}

const getBookById = (slug: string) => {
    return axios.get<IBooksData>(`/api/book/${slug}`);
}

const getBookReviews = (bookId: number, page: number) => {
    return axios.get<Array<IBookReviews>>(`/api/book/${bookId}/reviews?page=${page}`);
}

const calculateBookPrice = (price: number, discount: number): number => {
    if (discount === 0) {
        return price;
    }

    const discountAmount = (discount / 100) * price;
    return price - discountAmount;
}

const addBookReview = (bookId: number, reviewText: string, rating: number) => {
    return axios.post(`/api/book/${bookId}/rating`, {review: reviewText, rating: rating}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}


const getAllBooksNoPagination = () => {
    return axios.get(`/api/admin/books`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const deleteBook = (id: number) => {
    return axios.delete(`/api/admin/books/${id}/delete`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getAllReviews = () => {
    return axios.get(`/api/admin/reviews`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const deleteReview = (id: number) => {
    return axios.delete(`/api/admin/reviews/${id}/delete`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const editReview = (data: IReviewEditRequest) => {
    return axios.patch(`/api/admin/reviews/${data.id}/edit`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const BooksService = {
    getAllBooks,
    getBookById,
    getBookReviews,
    calculateBookPrice,
    addBookReview,
    getAllBooksNoPagination,
    deleteBook,
    getAllReviews,
    deleteReview,
    editReview
};

export default BooksService;