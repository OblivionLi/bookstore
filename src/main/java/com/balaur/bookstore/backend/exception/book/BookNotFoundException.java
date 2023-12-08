package com.balaur.bookstore.backend.exception.book;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class BookNotFoundException extends RuntimeException{
    private final String message;

    public BookNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
