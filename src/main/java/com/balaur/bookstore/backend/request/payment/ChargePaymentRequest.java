package com.balaur.bookstore.backend.request.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChargePaymentRequest {
    private String chargeId;
    private String paymentMethod;
    private String chargeTotal;
    private ChargeBillingAddress chargeBillingAddress;
    private Long orderId;
    private String userEmail;

    @Override
    public String toString() {
        return "ChargePaymentRequest{" +
                "chargeId='" + chargeId + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", chargeTotal='" + chargeTotal + '\'' +
                ", chargeBillingAddress=" + chargeBillingAddress +
                '}';
    }
}
