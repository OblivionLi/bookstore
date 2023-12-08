package com.balaur.bookstore.backend.util;

import lombok.Getter;

@Getter
public enum OrderStatus {
    NEW("New"),
    PROCESSING("Processing"),
    SHIPPED("Shipped"),
    DELIVERED("Delivered"),
    REFUNDED("Refunded"),
    CANCELED("Canceled");

    private final String displayName;

    OrderStatus(String displayName) {
        this.displayName = displayName;
    }
}
