package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.UserShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserShippingAddressRepository extends JpaRepository<UserShippingAddress, Long> {
}
