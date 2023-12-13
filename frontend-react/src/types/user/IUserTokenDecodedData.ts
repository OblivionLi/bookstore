import {IUserShippingAddress} from "./IUserShippingAddress";

export default interface IUserTokenDecodedData {
    firstName: string,
    lastName: string,
    sub: string,
    roles: string[],
    shippingAddress: IUserShippingAddress[],
    billingAddress: string[]
}