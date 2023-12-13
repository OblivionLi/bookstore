package com.balaur.bookstore.backend.model.user;

import com.balaur.bookstore.backend.model.order.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "billing_addresses")
@NoArgsConstructor
@AllArgsConstructor
public class UserBillingAddress implements UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String street;
    private String city;
    private String state;
    private String country;
    private String phoneNumber;
    private String zipcode;
    private String billingName;
    private boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}