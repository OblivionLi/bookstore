package com.balaur.bookstore.backend.model.order;

import com.balaur.bookstore.backend.model.book.Book;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "order_line_items")
public class OrderLineItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
//    @ManyToOne(cascade = {CascadeType.DETACH})
//    @JoinColumn(name = "book_id")
//    private Book book;
    private String title;
    private String type;
    private int quantity;
    private double pricePerUnit;
    private double totalPrice;
    private int discount;
}