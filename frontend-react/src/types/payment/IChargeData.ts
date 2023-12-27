import IChargeBillingAddress from "./IChargeBillingAddress";

export default interface IChargeData {
    chargeId: string | undefined;
    paymentMethod: string | undefined;
    chargeBillingAddress: IChargeBillingAddress | null;
    chargeTotal: string | undefined;
    orderId: number | undefined;
    userEmail: string | null;
}