package com.balaur.bookstore.backend.response.book;

import com.balaur.bookstore.backend.response.rating.RatingResponse;
import com.balaur.bookstore.backend.util.BookGenres;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Data
@Builder
public class BookResponse {
    private Long id;
    private String type;
    private String slug;
    private String isbn;
    private String title;
    private List<String> authors;
    private List<BookGenres> genres;
    private int pages;
    private int publicationYear;
    private int discount;
    private double price;
    private Date releaseDate;
    private String description;
    private String publisher;
    private String fileFormat;
    private List<RatingResponse> ratings;
    private double averageBookRating;
}
