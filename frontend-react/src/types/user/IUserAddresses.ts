import {IUserShippingAddress} from "./IUserShippingAddress";
import {IUserBillingAddress} from "./IUserBillingAddress";

export default interface IUserAddresses {
    address: IUserShippingAddress | IUserBillingAddress | null;
    onSave: (isSuccessful: boolean) => void;
    onClose: () => void;
}