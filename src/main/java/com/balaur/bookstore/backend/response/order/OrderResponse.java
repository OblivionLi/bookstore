package com.balaur.bookstore.backend.response.order;

import com.balaur.bookstore.backend.model.order.OrderBillingAddress;
import com.balaur.bookstore.backend.model.order.OrderShippingAddress;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String orderId;
    private String notes;
    private String orderDate;
    private double shippingCost;
    private double taxAmount;
    private String orderStatus;
    private String paymentStatus;
    private double subtotal;
    private double totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private OrderShippingAddress orderShippingAddress;
    private OrderBillingAddress orderBillingAddress;
    private List<OrderLineItemResponse> orderLineItems;
}
