export default interface IUserBillingAddressRequest {
    street: string | undefined;
    city: string | undefined;
    state: string | undefined;
    country: string | undefined;
    phoneNumber: string | undefined;
    zipcode: string | undefined;
    billingName: string | undefined;
}