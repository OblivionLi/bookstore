package com.balaur.bookstore.service;

import com.balaur.bookstore.backend.model.order.Order;
import com.balaur.bookstore.backend.model.payment.Payment;
import com.balaur.bookstore.backend.model.payment.PaymentHistory;
import com.balaur.bookstore.backend.model.payment.PaymentHistoryRepository;
import com.balaur.bookstore.backend.repository.order.OrderRepository;
import com.balaur.bookstore.backend.repository.payment.PaymentRepository;
import com.balaur.bookstore.backend.repository.user.UserRepository;
import com.balaur.bookstore.backend.request.payment.ChargePaymentRequest;
import com.balaur.bookstore.backend.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DataJpaTest
class PaymentServiceTest {
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private PaymentRepository paymentRepository;
    @Mock
    private PaymentHistoryRepository paymentHistoryRepository;
    @InjectMocks
    private PaymentService paymentService;

//    @Test
//    @DisplayName("Test chargeCard success")
//    void testChargeCardSuccess() throws StripeException {
//        Stripe.apiKey = "testApiKey";
//        ChargePaymentRequest request = new ChargePaymentRequest();
//        request.setChargeId("testChargeId");
//        request.setChargeTotal("10.00");
//        request.setOrderId(1L);
//        request.setUserEmail("test@example.com");
//
//        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//                .setCurrency("eur")
//                .setAmount(1000L)
//                .setPaymentMethod("testChargeId")
//                .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC)
//                .setConfirm(true)
//                .setReturnUrl("testReturnUrl")
//                .build();
//
//        PaymentIntent paymentIntent = new PaymentIntent();
//        paymentIntent.setClientSecret("testClientSecret");
//        paymentIntent.setAmountReceived(1000L);
//        paymentIntent.setCurrency("eur");
//        paymentIntent.setLatestCharge("testLatestCharge");
//        paymentIntent.setCreated(System.currentTimeMillis() / 1000);
//
//        when(orderRepository.findById(1L)).thenReturn(Optional.of(new Order()));
//        when(paymentRepository.save(any())).thenReturn(new Payment());
//        when(paymentHistoryRepository.save(any())).thenReturn(new PaymentHistory());
//        when(PaymentIntent.create(params)).thenReturn(paymentIntent);
//
//        ResponseEntity<Map<String, String>> response = paymentService.chargeCard(request);
//
//        assertNotNull(response);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertNotNull(response.getBody());
//        assertEquals("testClientSecret", response.getBody().get("clientSecret"));
//    }
//
//    @Test
//    @DisplayName("Test chargeCard with StripeException")
//    void testChargeCardWithStripeException() throws StripeException {
//        Stripe.apiKey = "testApiKey";
//        ChargePaymentRequest request = new ChargePaymentRequest();
//        request.setChargeId("testChargeId");
//        request.setChargeTotal("10.00");
//        request.setOrderId(1L);
//        request.setUserEmail("test@example.com");
//
//        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//                .setCurrency("eur")
//                .setAmount(1000L)
//                .setPaymentMethod("testChargeId")
//                .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC)
//                .setConfirm(true)
//                .setReturnUrl("testReturnUrl")
//                .build();
//
//        when(orderRepository.findById(1L)).thenReturn(Optional.of(new Order()));
//        when(PaymentIntent.create(params)).thenThrow(new CardException("testMessage", "testRequestId", "testCode", "testParam", "testDeclineCode", "testChargeId", 5, null));
//
//        assertThrows(RuntimeException.class, () -> paymentService.chargeCard(request));
//    }
}