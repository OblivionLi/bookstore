import IOrderItemRequest from "./IOrderItemRequest";
import IUserShippingAddressRequest from "../user/IUserShippingAddressRequest";
import IUserBillingAddressRequest from "../user/IUserBillingAddressRequest";

export default interface IPlaceOrderRequest {
    orderItems: IOrderItemRequest[];
    deliveryNotes: string;
    userShippingAddress: IUserShippingAddressRequest;
    userBillingAddress: IUserBillingAddressRequest;
}