package com.balaur.bookstore.backend.repository;

import com.balaur.bookstore.backend.model.order.OrderBillingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderBillingAddressRepository extends JpaRepository<OrderBillingAddress, Long> {
    @Query("SELECT s FROM OrderBillingAddress s WHERE s.zipcode = :zipcode")
    OrderBillingAddress findByZipcode(@Param("zipcode") String zipcode);
}