package com.balaur.bookstore.backend.exception;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@Builder
public record ErrorResponse(
        String timestamp,
        HttpStatus status,
        int statusCode,
        String exception,
        String message,
        String path,
        List<String> errors
) {}
