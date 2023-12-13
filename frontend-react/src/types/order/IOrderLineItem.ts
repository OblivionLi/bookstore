export default interface OrderLineItem {
    orderId: number;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
    discount: number;
    bookTitle: string;
    bookType: string;
}