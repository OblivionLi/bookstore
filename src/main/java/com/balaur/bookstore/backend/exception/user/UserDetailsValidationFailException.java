package com.balaur.bookstore.backend.exception.user;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class UserDetailsValidationFailException extends RuntimeException {
    private final String message;

    public UserDetailsValidationFailException(String message) {
       super(message);
       this.message = message;
    }
}
