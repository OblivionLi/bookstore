package com.balaur.bookstore.backend.exception.user;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(code = HttpStatus.CONFLICT)
public class EmailConflictException extends RuntimeException {
    private final String message;

    public EmailConflictException(String message) {
        super(message);
        this.message = message;
    }
}
