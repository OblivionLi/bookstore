import OrderShippingAddress from "./IOrderShippingAddress";
import OrderBillingAddress from "./IOrderBillingAddress";
import OrderLineItem from "./IOrderLineItem";

export default interface IOrdersData {
    id: number;
    orderId: string;
    notes: string;
    orderDate: string;
    shippingCost: number;
    taxAmount: number;
    subtotal: number;
    totalPrice: number;
    orderStatus: string;
    paymentStatus: string;
    orderShippingAddress: OrderShippingAddress;
    orderBillingAddress: OrderBillingAddress;
    orderLineItems: OrderLineItem[];
    createdAt: Date;
    updatedAt: Date;
}