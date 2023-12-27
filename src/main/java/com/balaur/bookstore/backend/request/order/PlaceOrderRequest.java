package com.balaur.bookstore.backend.request.order;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderRequest {
    @NotEmpty(message = "Order can't be placed without line items.")
    private List<OrderItemRequest> orderItems;
    @NotNull
    private UserShippingAddressRequest userShippingAddress;
    @NotNull
    private UserBillingAddressRequest userBillingAddress;
    private String deliveryNotes;

    @Override
    public String toString() {
        return "PlaceOrderRequest{" +
                "orderItems=" + orderItems +
                ", userShippingAddress=" + userShippingAddress +
                ", userBillingAddress=" + userBillingAddress +
                ", deliveryNotes='" + deliveryNotes + '\'' +
                '}';
    }
}
