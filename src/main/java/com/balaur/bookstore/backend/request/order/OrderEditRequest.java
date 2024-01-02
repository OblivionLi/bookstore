package com.balaur.bookstore.backend.request.order;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderEditRequest {
    @NotNull(message = "Order id must be provided")
    private Long id;
    @NotNull(message = "Order status field can't be missing from request")
    @NotEmpty(message = "Order status field can't be empty")
    private String orderStatus;
    @NotNull(message = "Payment status field can't be missing from request")
    @NotEmpty(message = "Payment status field can't be empty")
    private String paymentStatus;
}
