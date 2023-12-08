package com.balaur.bookstore.backend.exception.user;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(code = HttpStatus.CONFLICT)
public class PasswordConflictException extends RuntimeException {
    private final String message;
    public PasswordConflictException(String message) {
        super(message);
        this.message = message;
    }
}
