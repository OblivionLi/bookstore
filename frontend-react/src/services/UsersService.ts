import axios from "axios";
import IUserDtoResponse from "../types/user/IUserDtoResponse";
import LocalStorageService from "./LocalStorageService";
import {IUserShippingAddress} from "../types/user/IUserShippingAddress";
import {IUserBillingAddress} from "../types/user/IUserBillingAddress";
import IUserDefaultAddress from "../types/user/IUserDefaultAddress";
import IUserResponse from "../types/user/IUserResponse";

const registerUser = (formData: object) => {
    return axios.post<Array<IUserDtoResponse>>(`/api/auth/register`, JSON.stringify(formData), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const loginUser = (formData: object) => {
    return axios.post<Array<IUserDtoResponse>>(`/api/auth/login`, JSON.stringify(formData), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const updateUserDetails = (formData: object) => {
    return axios.patch<Array<IUserDtoResponse>>(`/api/user/change-details`, JSON.stringify(formData), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getAllShippingAddresses = () => {
    return axios.get<Array<IUserShippingAddress>>(`/api/user/shipping-address`, {
        headers: {
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getAllBillingAddresses = () => {
    return axios.get<Array<IUserBillingAddress>>(`/api/user/billing-address`, {
        headers: {
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const deleteAddress = (id: number, type: string) => {
    const addressIdAndTypeToDelete = id + ":" + type;
    return axios.delete(`/api/user/address/${addressIdAndTypeToDelete}/delete`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const markAddressAsDefault = (id: number, addressType: string) => {
    return axios.patch(`/api/user/address/${id}/mark-default`, {addressType},{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const updateAddress = (address: IUserShippingAddress | IUserBillingAddress) => {
    return axios.patch(`/api/user/edit-address`, address, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const saveAddress = (address: IUserShippingAddress | IUserBillingAddress) => {
    return axios.post(`/api/user/add-address`, address, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getDefaultShippingAddress = () => {
    return axios.get(`/api/user/default/shipping-address`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getDefaultBillingAddress = () => {
    return axios.get<IUserDefaultAddress>(`/api/user/default/billing-address`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const forgotPassword = (email: string) => {
    return axios.post(`/api/auth/forgot-password`, {email});
}

const isResetPasswordTokenValid = (token: string) => {
    return axios.get(`/api/auth/reset-password/` + token);
}

const resetUserPassword = (formData: object) => {
    return axios.patch(`/api/auth/reset-password`, formData);
}

const getAllUsers = () => {
    return axios.get<IUserResponse>(`/api/admin/users`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}


const UsersService = {
    registerUser,
    loginUser,
    updateUserDetails,
    getAllShippingAddresses,
    getAllBillingAddresses,
    deleteAddress,
    markAddressAsDefault,
    updateAddress,
    saveAddress,
    getDefaultShippingAddress,
    getDefaultBillingAddress,
    forgotPassword,
    isResetPasswordTokenValid,
    resetUserPassword,
    getAllUsers
};

export default UsersService;