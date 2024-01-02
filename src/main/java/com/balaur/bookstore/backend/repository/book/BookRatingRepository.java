package com.balaur.bookstore.backend.repository.book;

import com.balaur.bookstore.backend.model.book.BookRating;
import com.balaur.bookstore.backend.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRatingRepository extends JpaRepository<BookRating, Long> {
    @Query("SELECT r FROM BookRating r WHERE r.book.id = :bookId AND r.user.id = :userId")
    BookRating findRatingByBookAndUser(@Param("bookId") Long bookId, @Param("userId") Long userId);

    @Query("SELECT r FROM BookRating r WHERE r.book.id = :bookId")
    Page<BookRating> findAllByBookId(@Param("bookId") Long bookId, PageRequest pageRequest);

    @Query("SELECT r FROM BookRating  r WHERE r.user.id = :userId")
    List<BookRating> findByUserId(@Param("userId") Long userId);
}
