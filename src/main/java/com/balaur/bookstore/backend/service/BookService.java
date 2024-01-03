package com.balaur.bookstore.backend.service;

import com.balaur.bookstore.backend.dto.BookDto;
import com.balaur.bookstore.backend.request.book.ReviewRequest;
import com.balaur.bookstore.backend.response.admin.book.ReviewsResponse;
import com.balaur.bookstore.backend.response.rating.RatingResponse;
import com.balaur.bookstore.backend.response.user.UserDetailsResponse;
import com.balaur.bookstore.backend.exception.book.*;
import com.balaur.bookstore.backend.factory.BookFactory;
import com.balaur.bookstore.backend.model.book.*;
import com.balaur.bookstore.backend.model.user.User;
import com.balaur.bookstore.backend.repository.book.BookRatingRepository;
import com.balaur.bookstore.backend.repository.book.BookRepository;
import com.balaur.bookstore.backend.repository.user.UserRepository;
import com.balaur.bookstore.backend.request.book.BookCreateRequest;
import com.balaur.bookstore.backend.request.book.BookEditRequest;
import com.balaur.bookstore.backend.request.book.BookRatingRequest;
import com.balaur.bookstore.backend.response.book.BookResponse;
import com.balaur.bookstore.backend.response.book.BookReviewResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BookRatingRepository bookRatingRepository;

    public ResponseEntity<BookResponse> addBook(Authentication authentication, BookCreateRequest request) {
        User authenticatedUser = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (authenticatedUser == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        Book foundBook = bookRepository.findBookByIsbn(request.getIsbn());
        if (foundBook != null) {
            log.warn("[BookService] " + new Date() + " | Book with isbn " + request.getIsbn() + " already exist.");
            throw new BookConflictException("Book with isbn " + request.getIsbn() + " already exist.");
        }

        HashMap<String, Object> mappedAttributes;
        try {
            mappedAttributes = BookDto.mapAttributes(request);
        } catch (BookDtoException ex) {
            log.error("[BookService] " + new Date() + " | Couldn't map request to dto for book with isbn: " + request.getIsbn() + " because of the following error: " + ex.getMessage());
            throw ex;
        }

        try {
            BookFactory bookFactory = new BookFactory();
            Book newBook = bookRepository.save(bookFactory.createBook(mappedAttributes));

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    mapBookResponse(newBook)
            );
        } catch (BookCreateException ex) {
            log.error("[BookService] " + new Date() + " | Couldn't save new book with isbn: " + request.getIsbn() + " because of the following error: " + ex.getMessage());
            throw ex;
        }
    }

    public ResponseEntity<BookResponse> editBook(Authentication authentication, Long id, BookEditRequest request) {
        User authenticatedUser = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (authenticatedUser == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        Book book = bookRepository.findBookById(id);
        if (book == null) {
            log.warn("[BookService] " + new Date() + " | Book with id " + id + " not found.");
            throw new BookNotFoundException("Book with id " + id + " not found.");
        }

        BookDto.mapEditedAttributes(book, request);

        try {
            Book editedBook = bookRepository.save(book);

            return ResponseEntity.status(HttpStatus.OK).body(
                    mapBookResponse(editedBook)
            );
        } catch (BookCreateException ex) {
            log.error("[BookService] " + new Date() + " | Couldn't save edited book with id: " + id + " because of the following error: " + ex.getMessage());
            throw ex;
        }
    }

    public ResponseEntity<BookResponse> getBook(String slug) {
        Book book = bookRepository.findBookBySlug(slug);
        if (book == null) {
            log.warn("[BookService] " + new Date() + " | Book with id " + slug + " not found.");
            throw new BookNotFoundException("Book with id " + slug + " not found.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                mapBookResponse(book)
        );
    }

    public ResponseEntity<Page<BookResponse>> getAllBooks(int page, int size) {
        Page<Book> books = bookRepository.findByDeletedFalse(PageRequest.of(page, size));
        if (books.isEmpty()) {
            log.warn("[BookService] " + new Date() + " | No books found.");
            throw new BookNotFoundException("No books found.");
        }

        Page<BookResponse> response = books.map(this::mapBookResponse);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Async
    @Transactional
    public void addRating(Authentication authentication, BookRatingRequest request, Long bookId) {
        User user = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (user == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        Book book = bookRepository.findBookById(bookId);
        if (book == null) {
            log.warn("[BookService] " + new Date() + " | No book found.");
            throw new BookNotFoundException("No book found.");
        }

        BookRating bookRating = bookRatingRepository.findRatingByBookAndUser(book.getId(), user.getId());
        if (bookRating == null) {
            bookRating = new BookRating();
        }

        bookRating.setBook(book);
        bookRating.setUser(user);
        bookRating.setRating(request.getRating());
        bookRating.setReview(request.getReview());

        try {
            bookRatingRepository.save(bookRating);
        } catch (Exception ex) {
            log.error("[BookService] " + new Date() + " | Couldn't add rating for book because of the following error: " + ex.getMessage());
            throw ex;
        }
    }

    public void deleteRating(Long ratingId) {
        Optional<BookRating> bookRating = bookRatingRepository.findById(ratingId);
        if (bookRating.isEmpty()) {
            log.warn("[BookService] " + new Date() + " | No book rating found.");
            throw new BookRatingNotFoundException("No book rating found.");
        }

        try {
            bookRatingRepository.delete(bookRating.get());
        } catch (Exception ex) {
            log.error("[BookService] " + new Date() + " | Couldn't delete rating for book because of the following error: " + ex.getMessage());
            throw ex;
        }
    }

    @Cacheable("bookAverageRating")
    public double getBookRating(Authentication authentication, Long id) {
        User user = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (user == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isEmpty()) {
            log.warn("[BookService] " + new Date() + " | No book found.");
            throw new BookNotFoundException("No book found.");
        }

        Book book = optionalBook.get();
        return getAverageBookRating(book);
    }

    private double getAverageBookRating(Book book) {
        double sum = book.getRatings().stream().mapToInt(BookRating::getRating).sum();
        int count = book.getRatings().size();

        return count > 0 ? sum / count : 0;
    }

    private BookResponse mapBookResponse(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .type(getBookSpecificDetails(book).get("type"))
                .slug(book.getSlug())
                .title(book.getTitle())
                .isbn(book.getIsbn())
                .description(book.getDescription())
                .publicationYear(book.getPublicationYear())
                .publisher(book.getPublisher())
                .authors(book.getAuthors())
                .genres(book.getGenres())
                .pages(book.getPages())
                .discount(book.getDiscount())
                .price(book.getPrice())
                .releaseDate(book.getReleaseDate())
                .fileFormat(getBookSpecificDetails(book).get("fileFormat"))
                .ratings(getBookRatingDetails(book.getRatings()))
                .averageBookRating(getAverageBookRating(book))
                .quantity(getBookQuantity(book))
                .createdAt(book.getCreatedAt())
                .updatedAt(book.getUpdatedAt())
                .fileSize(getBookSpecificDetails(book).get("fileSize"))
                .downloadLink(getBookSpecificDetails(book).get("downloadLink"))
                .duration(getBookSpecificDetails(book).get("duration"))
                .narrator(getBookSpecificDetails(book).get("narrator"))
                .coverImage(getBookSpecificDetails(book).get("coverImage"))
                .build();
    }

    private Integer getBookQuantity(Book book) {
        if (book instanceof NormalBook) {
            return ((NormalBook) book).getQuantity();
        }

        return null;
    }

    private List<RatingResponse> getBookRatingDetails(Set<BookRating> ratings) {
        return ratings.stream()
                .map(rating -> RatingResponse.builder()
                        .id(rating.getId())
                        .bookId(rating.getBook().getId())
                        .userId(rating.getUser().getId())
                        .rating(rating.getRating())
                        .review(rating.getReview())
                        .userName(rating.getUser().getFirstName() + " " + rating.getUser().getLastName())
                        .build())
                .collect(Collectors.toList());
    }

    private HashMap<String, String> getBookSpecificDetails(Book book) {
        HashMap<String, String> bookSpecificDetails = new HashMap<>();
        bookSpecificDetails.put("type", null);
        bookSpecificDetails.put("fileFormat", null);
        bookSpecificDetails.put("fileSize", null);
        bookSpecificDetails.put("downloadLink", null);
        bookSpecificDetails.put("duration", null);
        bookSpecificDetails.put("narrator", null);
        bookSpecificDetails.put("coverImage", null);

        if (book instanceof NormalBook) {
            bookSpecificDetails.put("type", ((NormalBook) book).getBookType());
            bookSpecificDetails.put("coverImage", ((NormalBook) book).getCoverImage());
        } else if (book instanceof EBook) {
            bookSpecificDetails.put("type", ((EBook) book).getBookType());
            bookSpecificDetails.put("fileFormat", ((EBook) book).getFileFormat().getFormat());
            bookSpecificDetails.put("fileSize", String.valueOf(((EBook) book).getFileSize()));
            bookSpecificDetails.put("downloadLink", ((EBook) book).getDownloadLink());
        } else if (book instanceof AudioBook) {
            bookSpecificDetails.put("type", ((AudioBook) book).getBookType());
            bookSpecificDetails.put("fileFormat", ((AudioBook) book).getAudioFormat().getFormat());
            bookSpecificDetails.put("fileSize", String.valueOf(((AudioBook) book).getFileSize()));
            bookSpecificDetails.put("downloadLink", ((AudioBook) book).getDownloadLink());
            bookSpecificDetails.put("duration", ((AudioBook) book).getDuration());
            bookSpecificDetails.put("narrator", ((AudioBook) book).getNarrator());
        }

        return bookSpecificDetails;
    }

    public ResponseEntity<Page<BookReviewResponse>> getBookReviews(Long bookId, int page, int size) {
        Page<BookRating> bookRatings = bookRatingRepository.findAllByBookId(bookId, PageRequest.of(page, size));
        if (bookRatings.isEmpty()) {
            log.warn("[BookService] " + new Date() + " | No ratings for book found.");
            throw new BookNotFoundException("No ratings for book found.");
        }

        Page<BookReviewResponse> response = bookRatings.map(this::mapBookReviewResponse);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private BookReviewResponse mapBookReviewResponse(BookRating bookRating) {
        return BookReviewResponse.builder()
                .id(bookRating.getId())
                .rating(bookRating.getRating())
                .review(bookRating.getReview())
                .username(bookRating.getUser().getEmail())
                .createdAt(bookRating.getCreatedAt())
                .build();
    }

    public ResponseEntity<List<BookResponse>> getAllOrdersNoPagination(Authentication authentication) {
        User authenticatedUser = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (authenticatedUser == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        List<Book> books = bookRepository.findByDeletedFalse();
        if (books.isEmpty()) {
            log.warn("[BookService] " + new Date() + " | No books found.");
            throw new BookNotFoundException("No books found.");
        }

        List<BookResponse> response = books.stream()
                .map(this::mapBookResponse)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Transactional
    public ResponseEntity<String> deleteBook(Authentication authentication, Long id) {
        User authenticatedUser = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (authenticatedUser == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        Book book = bookRepository.findBookById(id);
        if (book == null) {
            log.warn("[BookService] " + new Date() + " | Book with id " + id + " not found.");
            throw new BookNotFoundException("Book with id " + id + " not found.");
        }

        try {
            book.setDeleted(true);
            bookRepository.delete(book);
            return ResponseEntity.status(HttpStatus.OK).body("Book deleted successfully.");
        } catch (Exception ex) {
            log.error("[BookService] " + new Date() + " | Couldn't delete book with id: " + id + " because of the following error: " + ex.getMessage());
            throw ex;
        }
    }

    public ResponseEntity<List<ReviewsResponse>> getAllReviews(Authentication authentication) {
        User authenticatedUser = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (authenticatedUser == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        List<BookRating> reviews = bookRatingRepository.findAll();
        List<ReviewsResponse> reviewsResponses = new ArrayList<>();
        for (BookRating review : reviews) {
            reviewsResponses.add(
                ReviewsResponse.builder()
                        .id(review.getId())
                        .bookId(review.getBook().getId())
                        .bookTitle(review.getBook().getTitle())
                        .userEmail(review.getUser().getEmail())
                        .rating(review.getRating())
                        .review(review.getReview())
                        .createdAt(review.getCreatedAt())
                        .updatedAt(review.getUpdatedAt())
                        .build()
            );
        }

        return ResponseEntity.status(HttpStatus.OK).body(reviewsResponses);
    }

    public ResponseEntity<String> deleteReview(Authentication authentication, Long id) {
        User authenticatedUser = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (authenticatedUser == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        Optional<BookRating> bookRating = bookRatingRepository.findById(id);
        if (bookRating.isEmpty()) {
            log.warn("[BookService] " + new Date() + " | Book rating with id " + id + " not found.");
            throw new BookNotFoundException("Book rating with id " + id + " not found.");
        }

        bookRatingRepository.delete(bookRating.get());

        return ResponseEntity.status(HttpStatus.OK).body("Review deleted with success.");
    }

    public ResponseEntity<String> editReview(Authentication authentication, Long id, ReviewRequest request) {
        User authenticatedUser = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (authenticatedUser == null) {
            log.warn("[BookService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        Optional<BookRating> bookRating = bookRatingRepository.findById(id);
        if (bookRating.isEmpty()) {
            log.warn("[BookService] " + new Date() + " | Book rating with id " + id + " not found.");
            throw new BookNotFoundException("Book rating with id " + id + " not found.");
        }

        bookRating.get().setReview(request.getReview());
        bookRatingRepository.save(bookRating.get());
        return ResponseEntity.status(HttpStatus.OK).body("Review edited with success.");
    }
}
