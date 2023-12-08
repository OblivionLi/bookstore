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
public class BookEditRequest {
    @ValidBookType
    private String type;
    private String title;
    private String publisher;
    private String description;
    @Min(value = 1, message = "Book can't have less than 1 page")
    @Max(value = 15000, message = "Book can't have more than 15000 pages")
    private Integer pages;
    @Min(value = -99999, message = "Book publication year field can't be less than -99999")
    @Max(value = 99999, message = "Book publication year field can't be more than 99999")
    private Integer publicationYear;
    @Min(value = 0, message = "Book discount field can't have a negative value")
    @Max(value = 100, message = "Book discount field with a value more than 100 is not necessary, 100 is already `FREE`")
    private Integer discount;
    @Min(value = 0, message = "Book price can't have a negative value")
    private Double price;
    @Size(min = 1, message = "Book requires at least 1 author")
    private List<String> authors;
    private List<BookGenres> genres;
    @PastOrPresent(message = "Book release date must be in the past or present")
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    @Min(value = 1, message = "Audio Book filesize can't be less than 1 kb")
    @Max(value = 100000, message = "Audio book filesize can't be more than 100 mb")
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
    private String duration;
    private String narrator;

    // ebook specific properties
    private String fileFormat;
}
