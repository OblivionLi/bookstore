package com.balaur.bookstore.backend.response.rating;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RatingResponse {
    private Long id;
    private Long userId;
    private Long bookId;
    private String userName;
    private int rating;
    private String review;
}
