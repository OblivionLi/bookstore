package com.balaur.bookstore.backend.request.order;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequest {
    @NotNull(message = "Item id must be provided.")
    private Long itemId;
    private Integer quantity;
    @NotNull(message = "Item price must be provided.")
    private Double itemPrice;
    private Integer discount;

    @Override
    public String toString() {
        return "OrderItemRequest{" +
                "itemId=" + itemId +
                ", quantity=" + quantity +
                ", itemPrice=" + itemPrice +
                ", discount=" + discount +
                '}';
    }
}
