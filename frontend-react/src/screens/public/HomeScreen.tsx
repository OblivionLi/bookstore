import React, {PureComponent} from 'react';
import MainNavbar from "../../components/MainNavbar";
import BookFilters from "./book/filter/BookFilters";
import BooksListScreen from "./book/BooksListScreen";

class HomeScreen extends PureComponent {
    render() {
        return (
            <>
                <MainNavbar/>
                <BooksListScreen/>
            </>
        );
    }
}

export default HomeScreen;