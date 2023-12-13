export interface IUserShippingAddress {
    id: number;
    addressType: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phoneNumber: string;
    zipcode: string;
    recipientName: string;
    default: boolean;
}