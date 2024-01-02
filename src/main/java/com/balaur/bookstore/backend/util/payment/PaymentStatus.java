package com.balaur.bookstore.backend.util.payment;

import com.balaur.bookstore.backend.util.order.OrderStatus;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum PaymentStatus {
    PENDING("Pending"),
    SUCCESSFUL("Successful"),
    FAILED("Failed"),
    REFUNDED("Refunded"),
    CANCELED("Canceled");

    private final String paymentStatus;

    PaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public static PaymentStatus fromString(String value) {
        return Arrays.stream(values())
                .filter(paymentStatus -> paymentStatus.paymentStatus.equalsIgnoreCase(value))
                .findFirst()
                .orElse(null);
    }
}
