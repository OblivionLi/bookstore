package com.balaur.bookstore.backend.response.order;

import com.balaur.bookstore.backend.model.order.OrderBillingAddress;
import com.balaur.bookstore.backend.model.order.OrderShippingAddress;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String notes;
    private String orderDate;
    private double shippingCost;
    private double taxAmount;
    private String orderStatus;
    private double subtotal;
    private double totalPrice;
    private OrderShippingAddress orderShippingAddress;
    private OrderBillingAddress orderBillingAddress;
    private List<OrderLineItemResponse> orderLineItems;
}
