package com.balaur.bookstore.backend.response.order;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderLineItemResponse {
    private Long orderId;
    private int quantity;
    private double pricePerUnit;
    private double totalPrice;
    private int discount;
    private String bookTitle;
    private String bookType;
}
