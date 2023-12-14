package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {
}