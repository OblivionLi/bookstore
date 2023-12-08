package com.balaur.bookstore.backend.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserShippingAddressResponse {
    private Long id;
    private String street;
    private String city;
    private String state;
    private String country;
    private String phoneNumber;
    private String zipcode;
    private String recipientName;
    private String deliveryNotes;
    private boolean isDefault;
}
