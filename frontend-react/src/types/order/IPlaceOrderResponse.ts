export default interface IPlaceOrderResponse {
    billingName: string;
    city: string;
    country: string;
    orderId: number;
    orderTotal: number;
    recipientName: string;
    phoneNumber: string;
    shippingCost: number;
    state: string;
    street: string;
    taxAmount: number;
    zipcode: string;
}