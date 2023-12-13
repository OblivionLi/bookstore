package com.balaur.bookstore.backend.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAddressDto {
    private Long id;
    private String street;
    private String city;
    private String state;
    private String country;
    private String phoneNumber;
    private String zipcode;
    private String billingName;
    private boolean isDefault;
    private String recipientName;
}
