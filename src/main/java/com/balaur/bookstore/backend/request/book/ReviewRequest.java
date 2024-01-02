package com.balaur.bookstore.backend.request.book;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    @NotNull(message = "Review id must be provided")
    private Long id;
    @NotNull(message = "Review field can't be missing from request")
    @NotEmpty(message = "Review field can't be empty")
    private String review;
}
