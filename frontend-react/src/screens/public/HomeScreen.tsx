import React, {PureComponent} from 'react';
import MainNavbar from "../../components/MainNavbar";
import BookFilters from "./book/filter/BookFilters";
import BooksList from "./book/BooksList";

class HomeScreen extends PureComponent {
    render() {
        return (
            <>
                <MainNavbar/>
                <BooksList/>
            </>
        );
    }
}

export default HomeScreen;