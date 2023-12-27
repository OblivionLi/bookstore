package com.balaur.bookstore.backend.request.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChargeBillingAddress {
    private String billingName;
    private String city;
    private String country;
    private String phoneNumber;
    private String state;
    private String street;
    private String zipcode;

    @Override
    public String toString() {
        return "ChargeBillingAddress{" +
                "billingName='" + billingName + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", state='" + state + '\'' +
                ", street='" + street + '\'' +
                ", zipcode='" + zipcode + '\'' +
                '}';
    }
}
