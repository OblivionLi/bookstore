import * as jose from 'jose';
import IUserTokenDecodedData from "../types/user/IUserTokenDecodedData";
import IBooksData from "../types/book/IBooksData";

const isUserLogged = () => {
    const token = localStorage.getItem("userInfo");
    return token && !isUserTokenExpired(token);
}

const isUserTokenExpired = (token: string) => {
    if (!token) {
        return true;
    }

    const decodedToken: { exp: number } = jose.decodeJwt(token) as { exp: number };
    const currentDate = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentDate) {
        localStorage.removeItem("userInfo");
        return true;
    }

    return false;
}

const addUserTokenToLocalStorage = (token: string) => {
    localStorage.setItem("userInfo", token)
}

const getUsernameFromLocalStorage = () => {
    const token = localStorage.getItem("userInfo");
    if (!token || isUserTokenExpired(token)) {
        localStorage.removeItem("userInfo");
        return null;
    }

    const decodedToken: { lastName: string } = jose.decodeJwt(token) as { lastName: string };
    return decodedToken.lastName;
}

const logoutUser = () => {
    localStorage.removeItem("userInfo");
}

const getUserData = (): IUserTokenDecodedData | null => {
    const token = localStorage.getItem("userInfo");
    if (!token) {
        return null;
    }

    return jose.decodeJwt(token) as IUserTokenDecodedData;
}

const getUserToken = () => {
    const token = localStorage.getItem("userInfo");
    if (!token) {
        return null;
    }

    return token;
}

const getUserPermissions = () => {
    const token = localStorage.getItem("userInfo");
    if (!token) {
        return ['ROLE_ANONYMOUS'];
    }

    try {
        const claims: { roles: string[] } = jose.decodeJwt(token) as { roles: string[] };
        return claims.roles;
    } catch (error) {
        return ['ROLE_ANONYMOUS'];
    }
}

const addItemToCartStorage = (book: IBooksData) => {
    const existingCartData = localStorage.getItem("cart");
    const cartArray = existingCartData ? JSON.parse(existingCartData) : [];

    if (cartArray.length < 15) {
        cartArray.push(book);
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }
}

const isItemInCart = (id: number | undefined) => {
    if (!id) {
        return false;
    }

    const existingCartData = localStorage.getItem("cart");
    const cartArray = existingCartData ? JSON.parse(existingCartData) : [];

    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].id === id) {
            return true;
        }
    }

    return false;
}

const getAllCartItems = () => {
    const existingCartData = localStorage.getItem("cart");
    return existingCartData ? JSON.parse(existingCartData) : [];
}

const getCartItemCount = () => {
    const existingCartData = localStorage.getItem("cart");
    const cartArray = existingCartData ? JSON.parse(existingCartData) : [];
    return cartArray.length;
}

const removeItemFromCart = (id: number) => {
    if (id === null) {
        return false;
    }

    const existingCartData = localStorage.getItem("cart");
    const cartArray = existingCartData ? JSON.parse(existingCartData) : [];

    const itemIndex = cartArray.findIndex((item: IBooksData) => item.id === id);

    if (itemIndex !== -1) {
        cartArray.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cartArray));
        return true;
    }

    return false;
}

const removeItemsFromCart = () => {
    localStorage.removeItem("cart");
}

const LocalStorageService = {
    addUserTokenToLocalStorage,
    getUserPermissions,
    getUserToken,
    isUserLogged,
    getUsernameFromLocalStorage,
    logoutUser,
    getUserData,
    addItemToCartStorage,
    getCartItemCount,
    isItemInCart,
    getAllCartItems,
    removeItemFromCart,
    removeItemsFromCart
}

export default LocalStorageService;