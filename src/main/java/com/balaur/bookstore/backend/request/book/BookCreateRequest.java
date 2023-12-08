package com.balaur.bookstore.backend.request.book;

import com.balaur.bookstore.backend.annotation.*;
import com.balaur.bookstore.backend.util.BookGenres;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookCreateRequest {
    @ValidBookType
    private String type;
    @ValidBookIsbn
    private String isbn;
    @NotNull(message = "Book title field can't be missing from request")
    @NotEmpty(message = "Book title field can't be empty")
    private String title;
    @NotNull(message = "Book publisher field can't be missing from request")
    @NotEmpty(message = "Book publisher field can't be empty")
    private String publisher;
    @NotNull(message = "Book description field can't be missing from request")
    @NotEmpty(message = "Book description field can't be empty")
    private String description;
    @NotNull(message = "Book pages field can't be missing from request")
    @Min(value = 1, message = "Book can't have less than 1 page")
    @Max(value = 15000, message = "Book can't have more than 15000 pages")
    private Integer pages;
    @NotNull(message = "Book publication year field can't be missing from request")
    @Min(value = -99999, message = "Book publication year field can't be less than -99999")
    @Max(value = 99999, message = "Book publication year field can't be more than 99999")
    private Integer publicationYear;
    @Min(value = 0, message = "Book discount field can't have a negative value")
    @Max(value = 100, message = "Book discount field with a value more than 100 is not necessary, 100 is already `FREE`")
    private Integer discount;
    @NotNull
    @Min(value = 0, message = "Book price can't have a negative value")
    private Double price;
    @NotNull(message = "Book authors field can't be missing from request")
    @Size(min = 1, message = "Book requires at least 1 author")
    private List<String> authors;
    @ValidGenres
    private List<BookGenres> genres;
    @NotNull(message = "Book release date field can't be missing from request")
    @PastOrPresent(message = "Book release date must be in the past or present")
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    @Max(value = 100000, message = "Audio book filesize can't be more than 100 mb")
    @Min(value = 1, message = "Audio Book filesize can't be less than 1 kb")
    private Integer fileSize;
    private String downloadLink;

    // normal book specific properties
    @Min(value = 0, message = "Book quantity field value can't be less than 0")
    @Max(value = 99999, message = "Book quantity field value can't be more than 99999. Book's quantity can be increased more at any time after creation.")
    private Integer quantity;
    private String coverImage;

    // audiobook specific properties
    @Enumerated(EnumType.STRING)
    private String audioFormat;
    @ValidTimeDuration
    private String duration;
    @NotEmpty(message = "Audio book narrator field can't be empty")
    private String narrator;

    // ebook specific properties
    @ValidEbookType
    private String fileFormat;
}
