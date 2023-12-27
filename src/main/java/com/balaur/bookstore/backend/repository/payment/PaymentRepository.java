package com.balaur.bookstore.backend.repository.payment;

import com.balaur.bookstore.backend.model.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}