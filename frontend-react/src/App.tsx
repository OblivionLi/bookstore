import './App.css';
import {Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/public/HomeScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import ShowBook from "./screens/public/book/ShowBook";
import Login from "./screens/public/auth/Login";
import Register from "./screens/public/auth/Register";
import UserSettings from "./screens/public/user/setting/UserSettings";
import CartScreen from "./screens/public/cart/CartScreen";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomeScreen/>}/>
            <Route path={"/books/:id"} element={<ShowBook/>}/>
            <Route path={"/admin"} element={<AdminScreen/>}/>

            {/*  Auth routes  */}
            <Route path={"/register"} element={<Register/>} />
            <Route path={"/login"} element={<Login/>} />

            {/* User settings */}
            <Route path={"/user-settings/*"} element={<UserSettings/>} />

            {/*  Cart  */}
            <Route path={"/cart"} element={<CartScreen/>}/>
        </Routes>

        // <div>
        //     <nav className="navbar navbar-expand navbar-dark bg-dark">
        //         <a href="/" className="navbar-brand">
        //             Bookstore
        //         </a>
        //         <div className="navbar-nav mr-auto">
        //             <li className="nav-item">
        //                 <Link to={"/books"} className="nav-link">
        //                     Books
        //                 </Link>
        //             </li>
        //         </div>
        //     </nav>
        //
        //     <div className="container mt-3">
        //         <Routes>
        //             <Route path="/books" element={<BooksList/>} />
        //         </Routes>
        //     </div>
        // </div>
    );
}

export default App;
