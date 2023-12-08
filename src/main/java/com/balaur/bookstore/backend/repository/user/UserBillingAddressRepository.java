package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.UserBillingAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBillingAddressRepository extends JpaRepository<UserBillingAddress, Long> {
}