export default interface OrderBillingAddress {
    id: number;
    street: string;
    city: string;
    state: string;
    country: string;
    phoneNumber: string;
    zipcode: string;
    billingName: string;
}