package com.balaur.bookstore.backend.repository;

import com.balaur.bookstore.backend.model.order.Order;
import com.balaur.bookstore.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.user = :user")
    List<Order> findByUser(@Param("user") User user);
}
