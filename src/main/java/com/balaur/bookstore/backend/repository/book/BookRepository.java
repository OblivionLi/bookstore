package com.balaur.bookstore.backend.repository.book;

import com.balaur.bookstore.backend.model.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT b FROM Book b WHERE b.isbn = :isbn AND b.deleted = false")
    Book findBookByIsbn(@Param("isbn") String isbn);

    @Query("SELECT b FROM Book b WHERE b.id = :id AND b.deleted = false")
    Book findBookById(@Param("id") Long id);

    @Query("SELECT b FROM Book b WHERE b.slug = :slug AND b.deleted = false")
    Book findBookBySlug(@Param("slug") String slug);

    @Query("SELECT b FROM Book b WHERE b.deleted = false")
    List<Book> findByDeletedFalse();

    Page<Book> findByDeletedFalse(PageRequest of);

    @Query("SELECT b FROM Book b WHERE b.title LIKE %:searchTerm% AND b.deleted = false")
    Page<Book> searchByTitleAndDeletedFalse(@Param("searchTerm") String searchTerm, Pageable pageable);

    @Query("SELECT b FROM Book b LEFT JOIN b.ratings r WHERE b.deleted = false GROUP BY b.id ORDER BY AVG(r.rating) ASC")
    Page<Book> findAllOrderByAverageRatingAsc(Pageable pageable);

    @Query("SELECT b FROM Book b LEFT JOIN b.ratings r WHERE b.deleted = false GROUP BY b.id ORDER BY AVG(r.rating) DESC")
    Page<Book> findAllOrderByAverageRatingDesc(Pageable pageable);
}
