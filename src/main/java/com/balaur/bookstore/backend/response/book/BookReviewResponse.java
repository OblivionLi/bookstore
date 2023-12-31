package com.balaur.bookstore.backend.response.book;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookReviewResponse {
    private Long id;
    private String username;
    private Integer rating;
    private String review;
    private LocalDateTime createdAt;
}
