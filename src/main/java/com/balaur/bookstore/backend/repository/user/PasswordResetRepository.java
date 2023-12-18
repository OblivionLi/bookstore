package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.PasswordReset;
import jakarta.websocket.server.PathParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {
    @Query("SELECT r FROM PasswordReset r WHERE r.token = :token")
    PasswordReset findByToken(@PathParam("token") String token);
}