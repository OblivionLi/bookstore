package com.balaur.bookstore.backend.service.book;

import com.balaur.bookstore.backend.model.book.Book;
import com.balaur.bookstore.backend.repository.book.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BookFilterService {
    private final BookRepository bookRepository;

    public Page<Book> applyFilter(String selectedFilter, int page, int size) {
        if (selectedFilter.isEmpty()) {
            return bookRepository.findByDeletedFalse(PageRequest.of(page, size));
        }

        String[] filterParts = selectedFilter.split(":");
        if (filterParts.length == 2) {
            String property = filterParts[0];
            String sortType = filterParts[1];

            if (property.equals("ratings")) {
                return handleRatingSort(sortType, page, size);
            }

            Sort sort = Sort.by(Sort.Direction.fromString(sortType), property);
            return bookRepository.findByDeletedFalse(PageRequest.of(page, size, sort));
        }

        return bookRepository.findByDeletedFalse(PageRequest.of(page, size));
    }

    private Page<Book> handleRatingSort(String sortType, int page, int size) {
        if (sortType.equals("asc")) {
            return bookRepository.findAllOrderByAverageRatingAsc(PageRequest.of(page, size));
        } else if (sortType.equals("desc")) {
            return bookRepository.findAllOrderByAverageRatingDesc(PageRequest.of(page, size));
        } else {
            throw new IllegalArgumentException("Invalid sort type for ratings.");
        }
    }
}

