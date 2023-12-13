export interface IUserBillingAddress {
    id: number;
    addressType: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phoneNumber: string;
    zipcode: string;
    billingName: string;
    default: boolean;
}