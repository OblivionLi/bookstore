package com.balaur.bookstore.backend.model.payment;

import com.balaur.bookstore.backend.model.order.Order;
import com.balaur.bookstore.backend.model.user.User;
import com.balaur.bookstore.backend.util.payment.PaymentMethod;
import com.balaur.bookstore.backend.util.payment.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date paymentDate;
    private double amount;
    private String paymentStatus;
    private String paymentMethod;
    private String transactionId;
    private String currency;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "payment")
    private List<PaymentHistory> paymentHistories;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
