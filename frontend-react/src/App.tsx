import './App.css';
import {Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/public/HomeScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import ShowBook from "./screens/public/book/ShowBook";
import Login from "./screens/public/auth/Login";
import Register from "./screens/public/auth/Register";
import UserSettings from "./screens/public/user/setting/UserSettings";
import CartScreen from "./screens/public/cart/CartScreen";
import ShippingScreen from "./screens/public/cart/ShippingScreen";
import OrderHistoryScreen from "./screens/public/user/history/OrderHistoryScreen";
import ForgotPassword from "./screens/public/auth/ForgotPassword";
import ResetPassword from "./screens/public/auth/ResetPassword";
import ShowOrderScreen from "./screens/public/user/history/ShowOrderScreen";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomeScreen/>}/>
            <Route path={"/books/:id"} element={<ShowBook/>}/>
            <Route path={"/admin"} element={<AdminScreen/>}/>

            {/*  Auth routes  */}
            <Route path={"/register"} element={<Register/>} />
            <Route path={"/login"} element={<Login/>} />
            <Route path={"/forgot-password"} element={<ForgotPassword/>} />
            <Route path={"/reset-password"} element={<ResetPassword/>} />

            {/* User settings */}
            <Route path={"/user-settings/*"} element={<UserSettings/>} />

            {/*  Cart  */}
            <Route path={"/cart"} element={<CartScreen/>}/>
            <Route path={"/cart/shipping"} element={<ShippingScreen/>}/>

            {/* Show order */}
            <Route path={"/order/:id"} element={<ShowOrderScreen/>}/>

            {/*  User orders  */}
            <Route path={"/user-history"} element={<OrderHistoryScreen/>} />
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
