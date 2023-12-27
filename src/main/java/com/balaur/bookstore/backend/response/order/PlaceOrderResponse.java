package com.balaur.bookstore.backend.response.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderResponse {
    private Long id;
    private String orderId;
    private double orderTotal;
    private String recipientName;
    private String billingName;
    private String country;
    private String city;
    private String state;
    private String street;
    private String zipcode;
    private String phoneNumber;
    private double taxAmount;
    private double shippingCost;
}
