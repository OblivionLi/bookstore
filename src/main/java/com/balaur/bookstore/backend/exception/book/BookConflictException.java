package com.balaur.bookstore.backend.exception.book;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(code = HttpStatus.CONFLICT)
public class BookConflictException extends RuntimeException{
    private final String message;

    public BookConflictException(String message) {
        super(message);
        this.message = message;
    }
}
