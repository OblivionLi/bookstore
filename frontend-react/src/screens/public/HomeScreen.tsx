import React, {PureComponent} from 'react';
import MainNavbar from "../../components/MainNavbar";
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