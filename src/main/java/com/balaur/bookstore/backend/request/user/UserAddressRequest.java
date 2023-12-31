package com.balaur.bookstore.backend.request.user;

import com.balaur.bookstore.backend.annotation.ValidAddressType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAddressRequest {
    private Long id;
    @ValidAddressType
    private String addressType;
    private String street;
    private String city;
    private String state;
    private String country;
    private String phoneNumber;
    private String zipcode;
    private String billingName;
    @JsonProperty
    private boolean isDefault;
    private String recipientName;
}
