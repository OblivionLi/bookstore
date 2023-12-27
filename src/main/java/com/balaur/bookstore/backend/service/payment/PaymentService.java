package com.balaur.bookstore.backend.service.payment;

import com.balaur.bookstore.backend.model.order.Order;
import com.balaur.bookstore.backend.model.payment.Payment;
import com.balaur.bookstore.backend.model.payment.PaymentHistory;
import com.balaur.bookstore.backend.model.payment.PaymentHistoryRepository;
import com.balaur.bookstore.backend.model.user.User;
import com.balaur.bookstore.backend.repository.OrderRepository;
import com.balaur.bookstore.backend.repository.payment.PaymentRepository;
import com.balaur.bookstore.backend.repository.user.UserRepository;
import com.balaur.bookstore.backend.request.payment.ChargePaymentRequest;
import com.balaur.bookstore.backend.util.order.OrderStatus;
import com.balaur.bookstore.backend.util.payment.PaymentMethod;
import com.balaur.bookstore.backend.util.payment.PaymentStatus;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {
    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${stripe.return.url}")
    private String stripeReturnUrl;

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final PaymentHistoryRepository paymentHistoryRepository;

    public ResponseEntity<Map<String, String>> chargeCard(ChargePaymentRequest request) {
        Stripe.apiKey = stripeApiKey;
        String currency = "eur";

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setCurrency(currency)
                .setAmount((long) (Double.parseDouble(request.getChargeTotal()) * 100))
                .setPaymentMethod(request.getChargeId())
                .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC)
                .setConfirm(true)
                .setReturnUrl(stripeReturnUrl)
                .build();

        try {
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());

            savePayment(paymentIntent, request);

            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        } catch (StripeException ex) {
            throw new RuntimeException(ex);
        }
    }

    private void savePayment(PaymentIntent paymentIntent, ChargePaymentRequest request) {
        Optional<Order> order = orderRepository.findById(request.getOrderId());
        if (order.isEmpty()) {
            throw new RuntimeException("Couldn't find order");
        }

        Payment newPayment = new Payment();
        newPayment.setPaymentDate(new Date(paymentIntent.getCreated() * 1000));
        newPayment.setAmount(paymentIntent.getAmountReceived() / 100.0);
        newPayment.setPaymentStatus(PaymentStatus.SUCCESSFUL.getPaymentStatus());
        newPayment.setPaymentMethod(PaymentMethod.CREDIT_CARD.getPaymentMethod());
        newPayment.setTransactionId(paymentIntent.getLatestCharge());
        newPayment.setCurrency(paymentIntent.getCurrency());
        newPayment.setOrder(order.get());

        User user = userRepository.findByEmail(request.getUserEmail());
        newPayment.setUser(user);

        paymentRepository.save(newPayment);

        PaymentHistory paymentHistory = new PaymentHistory();
        paymentHistory.setPayment(newPayment);

        paymentHistoryRepository.save(paymentHistory);

        order.get().setPaymentStatus(PaymentStatus.SUCCESSFUL);
        order.get().setStatus(OrderStatus.PROCESSING);
        orderRepository.save(order.get());
    }
}
