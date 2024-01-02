package com.balaur.bookstore.backend.model.order;

import com.balaur.bookstore.backend.model.payment.Payment;
import com.balaur.bookstore.backend.model.user.User;
import com.balaur.bookstore.backend.util.order.OrderStatus;
import com.balaur.bookstore.backend.util.payment.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;
    private String orderId;
    private double totalPrice;
    private double subtotal;
    private double taxAmount;
    private double shippingCost;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderLineItem> orderLineItems;
    private String notes;
    @ManyToOne(cascade = {CascadeType.ALL, CascadeType.REMOVE})
    @JoinColumn(name = "order_shipping_address_id")
    private OrderShippingAddress orderShippingAddress;
    @ManyToOne(cascade = {CascadeType.ALL, CascadeType.REMOVE})
    @JoinColumn(name = "order_billing_address_id")
    private OrderBillingAddress orderBillingAddress;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;
}
