package com.balaur.bookstore.backend.repository.order;

import com.balaur.bookstore.backend.model.order.OrderLineItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderLineItemRepository extends JpaRepository<OrderLineItem, Long> {
}
