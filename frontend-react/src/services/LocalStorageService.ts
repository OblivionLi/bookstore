import * as jose from 'jose';
import IUserTokenDecodedData from "../types/IUserTokenDecodedData";

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

const LocalStorageService = {
    addUserTokenToLocalStorage,
    getUserPermissions,
    getUserToken,
    isUserLogged,
    getUsernameFromLocalStorage,
    logoutUser,
    getUserData
}

export default LocalStorageService;