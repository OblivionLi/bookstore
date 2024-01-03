package com.balaur.bookstore.backend.controller;

import com.balaur.bookstore.backend.request.book.BookRatingRequest;
import com.balaur.bookstore.backend.response.book.BookResponse;
import com.balaur.bookstore.backend.response.book.BookReviewResponse;
import com.balaur.bookstore.backend.service.book.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/{slug}")
    public ResponseEntity<BookResponse> getBook(@PathVariable String slug) {
        return bookService.getBook(slug);
    }

    @GetMapping()
    public ResponseEntity<Page<BookResponse>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam String selectedFilter,
            @RequestParam String searchTerm
    ) {
        return bookService.getAllBooks(page, size, selectedFilter, searchTerm);
    }

    @PostMapping("/{id}/rating")
    public void addRating(Authentication authentication, @RequestBody @Valid BookRatingRequest request, @PathVariable Long id) {
        bookService.addRating(authentication, request, id);
    }

    @DeleteMapping("/rating/{ratingId}")
    public void deleteRating(@PathVariable Long ratingId) {
        bookService.deleteRating(ratingId);
    }

    @GetMapping("/{id}/rating")
    public double getBookRating(Authentication authentication, @PathVariable Long id) {
        return bookService.getBookRating(authentication, id);
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<Page<BookReviewResponse>> getBookReviews(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        return bookService.getBookReviews(id, page, size);
    }
}
