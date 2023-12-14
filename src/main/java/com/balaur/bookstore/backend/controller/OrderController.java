package com.balaur.bookstore.backend.controller;

import com.balaur.bookstore.backend.request.order.PlaceOrderRequest;
import com.balaur.bookstore.backend.response.order.OrderResponse;
import com.balaur.bookstore.backend.response.order.PlaceOrderResponse;
import com.balaur.bookstore.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/order/placeorder")
    public ResponseEntity<PlaceOrderResponse> placeOrder(Authentication authentication, @RequestBody @Valid PlaceOrderRequest request) {
        return orderService.placeOrder(authentication, request);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getOrders(Authentication authentication) {
        return orderService.getOrders(authentication);
    }

    @DeleteMapping("/orders")
    public void deleteOrders() {
        orderService.deleteOrders();
    }
}
