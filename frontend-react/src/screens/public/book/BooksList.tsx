import React, {useEffect, useState} from 'react';
import BooksService from "../../../services/BooksService";
import '../../../styles.css'
import IBooksData from "../../../types/IBooksData";
import Pagination from "../../../components/Pagination";
import {Link} from "react-router-dom";
import LocalStorageService from "../../../services/LocalStorageService";
import BookFilters from "./filter/BookFilters";

function BooksList() {
    const [books, setBooks] = useState<Array<IBooksData>>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [userPermission, setUserPermission] = useState(["ROLE_ANONYMOUS"]);

    useEffect(() => {
        fetchBooks();
        getUserPermissions();
    }, [currentPage]);

    const getUserPermissions = () => {
        setUserPermission(prevUserPermission => {
            return  LocalStorageService.getUserPermissions();
        });
    }

    const fetchBooks = () => {
        BooksService.getAllBooks(currentPage)
            .then((response: any) => {
                setBooks(response.data?.content);
                setTotalPages(response.data?.totalPages)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    return (
        <div className="container-fluid">
            <BookFilters/>
            <div className="row g-2 justify-content-center">
                {books && books.map((book, index) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                        <div className="card p-3 border">
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{book?.title}</h5>
                                <p className="card-text">{book?.description}</p>
                                <div className="card-tooltip">
                                    <Link to={`/books/${book?.id}`} className="btn btn-primary">View Book</Link>
                                    <p>Price: <del>{book?.price} &euro;</del> | {BooksService.calculateBookPrice(book?.price, book?.discount).toFixed(2)} &euro;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default BooksList;