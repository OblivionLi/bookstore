package com.balaur.bookstore.backend.repository.order;

import com.balaur.bookstore.backend.model.order.Order;
import com.balaur.bookstore.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.user = :user")
    List<Order> findByUser(@Param("user") User user);

    @Query("SELECT o FROM Order o WHERE o.orderId = :orderId AND o.user = :user")
    Optional<Order> findByOrderIdAndUser(@Param("orderId") String id, @Param("user") User user);

}
