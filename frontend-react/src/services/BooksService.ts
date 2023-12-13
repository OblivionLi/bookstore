import axios from "axios";
import IBooksData from "../types/book/IBooksData";
import IBookReviews from "../types/book/IBookReviews";

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

const BooksService = {
    getAllBooks,
    getBookById,
    getBookReviews,
    calculateBookPrice
};

export default BooksService;