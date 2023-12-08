package com.balaur.bookstore.backend.util.address;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AddressType {
    SHIPPING("shipping"),
    BILLING("billing");

    private final String format;
}
