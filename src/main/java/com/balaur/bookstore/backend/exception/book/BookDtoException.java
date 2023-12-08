package com.balaur.bookstore.backend.exception.book;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BookDtoException extends RuntimeException {
    private final String message;

    public BookDtoException(String message) {
        super(message);
        this.message = message;
    }
}
