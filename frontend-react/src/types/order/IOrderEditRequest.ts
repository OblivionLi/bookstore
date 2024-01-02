export default interface IOrderEditRequest {
    id: number | undefined;
    orderStatus: string | null;
    paymentStatus: string | null;
}