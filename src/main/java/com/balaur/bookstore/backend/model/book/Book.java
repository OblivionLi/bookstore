package com.balaur.bookstore.backend.model.book;

import com.balaur.bookstore.backend.util.BookGenres;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books", indexes = {@Index(columnList = "id"), @Index(columnList = "slug", unique = true)})
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String slug;
    @Column(unique = true)
    private String isbn;
    private String title;
    private String publisher;
    private String description;

    @Column(name = "deleted")
    private boolean deleted;

    @ElementCollection
    private List<String> authors;

    @ElementCollection(targetClass = BookGenres.class)
    @Enumerated(EnumType.STRING)
    private List<BookGenres> genres;

    private int pages;
    private int publicationYear;
    private int discount;
    private double price;

    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BookRating> ratings = new HashSet<>();
}
