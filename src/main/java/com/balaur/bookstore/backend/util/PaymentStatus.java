package com.balaur.bookstore.backend.util;

import lombok.Getter;

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
}
