import IUserDefaultAddress from "./IUserDefaultAddress";

export default interface IUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    locked: boolean;
    userGroupCodes: string[];
    bookRatings: number;
    userBillingAddresses: IUserDefaultAddress
    userShippingAddress: IUserDefaultAddress
    createdAt: Date;
    updatedAt: Date;
}