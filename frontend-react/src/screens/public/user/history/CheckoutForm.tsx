import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import {Box, Button, TextField, Typography} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";
import DataRow from "../../../../types/order/IDataRow";
import UtilsService from "../../../../services/UtilsService";
import IChargeData from "../../../../types/payment/IChargeData";
import IChargeBillingAddress from "../../../../types/payment/IChargeBillingAddress";
import LocalStorageService from "../../../../services/LocalStorageService";
import ChargeService from "../../../../services/ChargeService";
import IOrdersData from "../../../../types/order/IOrdersData";

const ElementContainer = styled('div')({
    border: '1px solid lightgray',
    borderRadius: 4,
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    display: 'block'
});

const CARD_OPTIONS = {
    iconStyle: 'solid' as 'solid',
    style: {
        base: {
            iconColor: '#424770',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
                color: '#aab7c4'
            },
        },
        invalid: {
            iconColor: '#9e2146'
        },
    },
};

interface CheckoutFormProps {
    selectedRow: IOrdersData | null;
    setOpenPay: React.Dispatch<React.SetStateAction<boolean>>;
    onPaymentSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({selectedRow, setOpenPay, onPaymentSuccess}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardNumberElement);
        if (card) {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: card,
                billing_details: {
                    address: {
                        city: selectedRow?.orderBillingAddress.city,
                        country: UtilsService.mapCountryToAlpha2(selectedRow?.orderBillingAddress.country),
                        line1: selectedRow?.orderBillingAddress.street,
                        postal_code: selectedRow?.orderBillingAddress.zipcode,
                        state: selectedRow?.orderBillingAddress.state,
                    },
                    name: selectedRow?.orderBillingAddress.billingName,
                    phone: selectedRow?.orderBillingAddress.phoneNumber,
                },
            });

            if (error) {
                console.log("[error]", error);
                return;
            }

            const chargeBillingAddress: IChargeBillingAddress = {
                billingName: selectedRow?.orderBillingAddress.billingName,
                city: selectedRow?.orderBillingAddress.city,
                country: selectedRow?.orderBillingAddress.country,
                phoneNumber: selectedRow?.orderBillingAddress.phoneNumber,
                state: selectedRow?.orderBillingAddress.state,
                street: selectedRow?.orderBillingAddress.street,
                zipcode: selectedRow?.orderBillingAddress.zipcode
            }

            const chargeDate: IChargeData = {
                paymentMethod: paymentMethod?.card?.brand,
                chargeTotal: selectedRow?.totalPrice,
                chargeId: paymentMethod?.id,
                chargeBillingAddress: chargeBillingAddress,
                orderId: selectedRow?.id,
                userEmail: LocalStorageService.getEmailFromLocalStorage()
            }

            ChargeService.pay(chargeDate)
                .then((response: any) => {
                    setOpenPay(false);
                    onPaymentSuccess();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="subtitle1">Card Number</Typography>
            <ElementContainer>
                <CardNumberElement options={CARD_OPTIONS}/>
            </ElementContainer>

            <Typography variant="subtitle1">Expiration Date</Typography>
            <ElementContainer>
                <CardExpiryElement options={CARD_OPTIONS}/>
            </ElementContainer>

            <Typography variant="subtitle1">CVC</Typography>
            <ElementContainer>
                <CardCvcElement options={CARD_OPTIONS}/>
            </ElementContainer>

            <Box mt={2}>
                <Button type="submit" disabled={!stripe} variant="contained" color="primary" fullWidth>
                    Pay
                </Button>
            </Box>
        </form>
    );
};

export default CheckoutForm;