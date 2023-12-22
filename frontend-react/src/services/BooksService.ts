import axios from "axios";
import IBooksData from "../types/book/IBooksData";
import IBookReviews from "../types/book/IBookReviews";
import LocalStorageService from "./LocalStorageService";

const getAllBooks = (page: number) => {
    return axios.get<Array<IBooksData>>(`/api/book?page=${page}`);
}

const getBookById = (id: string) => {
    return axios.get<IBooksData>(`/api/book/${id}`);
}

const getBookReviews = (bookId: number, page: number) => {
    return axios.get<Array<IBookReviews>>(`/api/book/${bookId}/reviews?page=${page}`);
}

const calculateBookPrice = (price: number, discount: number): number => {
    if (discount == 0) {
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

const BooksService = {
    getAllBooks,
    getBookById,
    getBookReviews,
    calculateBookPrice,
    addBookReview
};

export default BooksService;