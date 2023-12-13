package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.UserAddress;
import com.balaur.bookstore.backend.model.user.UserBillingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

public interface UserBillingAddressRepository extends JpaRepository<UserBillingAddress, Long> {
    @Query("SELECT b FROM UserBillingAddress b WHERE b.isDefault = true")
    UserBillingAddress findDefault();
}