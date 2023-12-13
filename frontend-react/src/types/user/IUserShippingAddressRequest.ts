export default interface IUserShippingAddressRequest {
    street: string | undefined;
    city: string | undefined;
    state: string | undefined;
    country: string | undefined;
    phoneNumber: string | undefined;
    zipcode: string | undefined;
    recipientName: string | undefined;
}