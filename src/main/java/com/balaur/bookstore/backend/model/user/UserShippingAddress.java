package com.balaur.bookstore.backend.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shipping_addresses")
public class UserShippingAddress implements UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String street;
    private String city;
    private String state;
    private String country;
    private String phoneNumber;
    private String zipcode;
    private String recipientName;
    private boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
