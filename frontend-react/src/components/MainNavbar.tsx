import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import LocalStorageService from "../services/LocalStorageService";

function MainNavbar() {
    const navigate = useNavigate();

    const isUserLogged = LocalStorageService.isUserLogged();
    const username = LocalStorageService.getUsernameFromLocalStorage();
    const itemsInCartCount = LocalStorageService.getCartItemCount();

    const handleLogout = () => {
        LocalStorageService.logoutUser();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Bookstore</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link position-relative btn btn-primary" aria-current="page" to={"/cart"}>
                                Cart
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {itemsInCartCount}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                        </li>

                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </ul>
                    {isUserLogged ? (
                        <ul className="navbar-nav navbar-nav-scroll">
                            <li className="nav-item dropdown dropstart">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {username}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">History</a></li>
                                    <li><Link className="dropdown-item" to="/user-settings">Settings</Link></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type="button" onClick={handleLogout}>Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav navbar-nav-scroll gap-1">
                            <li className="nav-item">
                                <Link to={"/register"} className="btn btn-primary">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/login"} className="btn btn-primary">Login</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default MainNavbar;