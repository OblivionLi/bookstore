import IOrderItemRequest from "./IOrderItemRequest";
import IUserShippingAddressRequest from "./IUserShippingAddressRequest";
import IUserBillingAddressRequest from "./IUserBillingAddressRequest";

export default interface IPlaceOrderRequest {
    orderItems: IOrderItemRequest[];
    userShippingAddress: IUserShippingAddressRequest;
    userBillingAddress: IUserBillingAddressRequest;
}