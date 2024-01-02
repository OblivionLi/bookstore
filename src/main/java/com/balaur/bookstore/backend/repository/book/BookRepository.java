package com.balaur.bookstore.backend.repository.book;

import com.balaur.bookstore.backend.model.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT b FROM Book b WHERE b.isbn = :isbn")
    Book findBookByIsbn(@Param("isbn") String isbn);

    @Query("SELECT b FROM Book b WHERE b.id = :id")
    Book findBookById(@Param("id") Long id);

    @Query("SELECT b FROM Book b WHERE b.slug = :slug")
    Book findBookBySlug(@Param("slug") String slug);

    @Query("SELECT b FROM Book b WHERE b.deleted = false")
    List<Book> findByDeletedFalse();

    Page<Book> findByDeletedFalse(PageRequest of);
}
