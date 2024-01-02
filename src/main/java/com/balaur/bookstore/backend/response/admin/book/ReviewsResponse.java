package com.balaur.bookstore.backend.response.admin.book;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewsResponse {
    private Long id;
    private Long bookId;
    private String bookTitle;
    private String userEmail;
    private Integer rating;
    private String review;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
