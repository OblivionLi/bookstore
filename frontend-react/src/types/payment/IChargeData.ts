import IChargeBillingAddress from "./IChargeBillingAddress";

export default interface IChargeData {
    chargeId: string | undefined;
    paymentMethod: string | undefined;
    chargeBillingAddress: IChargeBillingAddress | null;
    chargeTotal: number | undefined;
    orderId: number | undefined;
    userEmail: string | null;
}