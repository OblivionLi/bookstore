export default interface IOrderItemRequest {
    itemId: number;
    quantity?: number;
    itemPrice?: number;
    discount?: number;
}