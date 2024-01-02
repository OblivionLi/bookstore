package com.balaur.bookstore.backend.util.order;

import lombok.Getter;

import java.util.Arrays;

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

    public static OrderStatus fromString(String value) {
        return Arrays.stream(values())
                .filter(orderStatus -> orderStatus.displayName.equalsIgnoreCase(value))
                .findFirst()
                .orElse(null);
    }
}
