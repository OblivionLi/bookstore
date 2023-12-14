package com.balaur.bookstore.backend.util.payment;

import lombok.Getter;

@Getter
public enum PaymentMethod {
    CREDIT_CARD("Credit Card"),
    PAYPAL("PayPal"),
    CASH_ON_DELIVERY("Cash on Delivery"),
    BANK_TRANSFER("Bank Transfer");

    private final String paymentMethod;

    PaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
