package com.balaur.bookstore.backend.repository.order;

import com.balaur.bookstore.backend.model.order.OrderShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderShippingAddressRepository extends JpaRepository<OrderShippingAddress, Long> {
    @Query("SELECT s FROM OrderShippingAddress s WHERE s.zipcode = :zipcode")
    OrderShippingAddress findByZipcode(@Param("zipcode") String zipcode);
}