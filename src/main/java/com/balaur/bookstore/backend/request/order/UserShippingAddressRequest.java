package com.balaur.bookstore.backend.request.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserShippingAddressRequest {
    private String street;
    private String city;
    private String state;
    private String country;
    private String phoneNumber;
    private String zipcode;
    private String recipientName;

    @Override
    public String toString() {
        return "UserShippingAddressRequest{" +
                "street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", recipientName='" + recipientName + '\'' +
                '}';
    }
}
