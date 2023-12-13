import axios from "axios";
import IPlaceOrderRequest from "../types/order/IPlaceOrderRequest";
import LocalStorageService from "./LocalStorageService";

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

const OrdersService = {
    placeOrder,
    getOrders
};

export default OrdersService;