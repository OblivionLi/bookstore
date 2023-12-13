import OrderShippingAddress from "./IOrderShippingAddress";
import OrderBillingAddress from "./IOrderBillingAddress";
import OrderLineItem from "./IOrderLineItem";

export default interface DataRow {
    id: number;
    orderDate: string;
    taxAmount: number;
    shippingCost: number;
    totalPrice: string;
    orderStatus: string;
    notes: string;
    orderShippingAddress: OrderShippingAddress;
    orderBillingAddress: OrderBillingAddress;
    orderLineItems: OrderLineItem[];
}