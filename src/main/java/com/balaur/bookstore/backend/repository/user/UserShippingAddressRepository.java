package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.UserAddress;
import com.balaur.bookstore.backend.model.user.UserShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

public interface UserShippingAddressRepository extends JpaRepository<UserShippingAddress, Long> {
    @Query("SELECT s FROM UserShippingAddress s WHERE s.isDefault = true")
    UserShippingAddress findDefault();
}
