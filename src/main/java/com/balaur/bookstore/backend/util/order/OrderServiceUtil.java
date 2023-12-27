package com.balaur.bookstore.backend.util.order;

import com.balaur.bookstore.backend.model.order.OrderLineItem;

import java.util.List;

public class OrderServiceUtil {
    public static double calculateOrderLineItemsSubtotal(List<OrderLineItem> orderLineItems) {
        double subtotal = 0;
        for (OrderLineItem orderLineItem : orderLineItems) {
            subtotal += orderLineItem.getPricePerUnit() * (orderLineItem.getQuantity() > 0 ? orderLineItem.getQuantity() : 1);
        }

        return subtotal;
    }

    public static double calculateOrderLineItemsTotal(List<OrderLineItem> orderLineItems) {
        double total = 0;
        for (OrderLineItem orderLineItem : orderLineItems) {
            int quantity = Math.max(orderLineItem.getQuantity(), 1);
            double itemTotal = orderLineItem.getPricePerUnit() * quantity * (1.0 - ((double) orderLineItem.getDiscount() / 100));
            total += itemTotal;
        }

        return total;
    }
}
