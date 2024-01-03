package com.balaur.bookstore.backend.controller;

import com.balaur.bookstore.backend.repository.payment.PaymentRepository;
import com.balaur.bookstore.backend.request.payment.ChargePaymentRequest;
import com.balaur.bookstore.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;

    @PostMapping("/charge")
    public ResponseEntity<Map<String, String>> chargeCard(@RequestBody ChargePaymentRequest request) {
        return paymentService.chargeCard(request);
    }

    @DeleteMapping("/delete")
    public void deleteAll() {
        paymentRepository.deleteAll();
    }
}
