import axios from "axios";
import IPlaceOrderRequest from "../types/order/IPlaceOrderRequest";
import LocalStorageService from "./LocalStorageService";
import IOrdersData from "../types/order/IOrdersData";
import IOrderEditRequest from "../types/order/IOrderEditRequest";

const placeOrder = (payload: IPlaceOrderRequest) => {
    return axios.post(`/api/order/placeorder`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getOrders = () => {
    return axios.get(`/api/orders`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getOrder = (id: string) => {
    return axios.get(`/api/orders/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const getAllOrders = () => {
    return axios.get(`/api/admin/orders`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const deleteOrder = (id: number) => {
    return axios.delete(`/api/admin/orders/${id}/delete`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const editOrder = (data: IOrderEditRequest) => {
    return axios.patch(`/api/admin/orders/${data.id}/edit`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const OrdersService = {
    placeOrder,
    getOrders,
    getOrder,
    getAllOrders,
    deleteOrder,
    editOrder
};

export default OrdersService;