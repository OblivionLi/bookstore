import './App.css';
import {Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/public/HomeScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import ShowBookScreen from "./screens/public/book/ShowBookScreen";
import LoginScreen from "./screens/public/auth/LoginScreen";
import RegisterScreen from "./screens/public/auth/RegisterScreen";
import UserSettingsScreen from "./screens/public/user/setting/UserSettingsScreen";
import CartScreen from "./screens/public/cart/CartScreen";
import ShippingScreen from "./screens/public/cart/ShippingScreen";
import OrderHistoryScreen from "./screens/public/user/history/OrderHistoryScreen";
import ForgotPasswordScreen from "./screens/public/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/public/auth/ResetPasswordScreen";
import ShowOrderScreen from "./screens/public/user/history/ShowOrderScreen";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomeScreen/>}/>
            <Route path={"/book/:slug"} element={<ShowBookScreen/>}/>
            <Route path={"/admin/*"} element={<AdminScreen/>}/>

            {/*  Auth routes  */}
            <Route path={"/register"} element={<RegisterScreen/>} />
            <Route path={"/login"} element={<LoginScreen/>} />
            <Route path={"/forgot-password"} element={<ForgotPasswordScreen/>} />
            <Route path={"/reset-password"} element={<ResetPasswordScreen/>} />

            {/* User settings */}
            <Route path={"/user-settings/*"} element={<UserSettingsScreen/>} />

            {/*  Cart  */}
            <Route path={"/cart"} element={<CartScreen/>}/>
            <Route path={"/cart/shipping"} element={<ShippingScreen/>}/>

            {/* Show order */}
            <Route path={"/order/:id"} element={<ShowOrderScreen/>}/>

            {/*  User orders  */}
            <Route path={"/orders-history"} element={<OrderHistoryScreen/>} />
        </Routes>
    );
}

export default App;
