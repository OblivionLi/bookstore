package com.balaur.bookstore.backend.config;

import com.balaur.bookstore.backend.exception.ErrorResponse;
import com.balaur.bookstore.backend.exception.book.BookConflictException;
import com.balaur.bookstore.backend.exception.book.BookCreateException;
import com.balaur.bookstore.backend.exception.book.BookDtoException;
import com.balaur.bookstore.backend.exception.user.PasswordDidNotMatchException;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(PasswordDidNotMatchException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFound(
            PasswordDidNotMatchException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .status(HttpStatus.NOT_FOUND)
                .statusCode(HttpStatus.NOT_FOUND.value())
                .exception(ex.getClass().getSimpleName())
                .message("Password did not match")
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .errors(Collections.singletonList("Password did not match"))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFound(
            UsernameNotFoundException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .status(HttpStatus.NOT_FOUND)
                .statusCode(HttpStatus.NOT_FOUND.value())
                .exception(ex.getClass().getSimpleName())
                .message("Username not found")
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .errors(Collections.singletonList("Username not found"))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            WebRequest request
    ) {
        List<String> validationErrors = new ArrayList<>();
        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            if (error instanceof FieldError fieldError) {
                validationErrors.add(fieldError.getField() + ": " + fieldError.getDefaultMessage());
            } else {
                validationErrors.add(error.getDefaultMessage());
            }
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .status(HttpStatus.BAD_REQUEST)
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .exception(ex.getClass().getSimpleName())
                .message("Validation failed")
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .errors(validationErrors)
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(BookConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflicts(
            BookConflictException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .status(HttpStatus.CONFLICT)
                .statusCode(HttpStatus.CONFLICT.value())
                .exception(ex.getClass().getSimpleName())
                .message("Creation failed")
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .errors(List.of(ex.getMessage()))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BookDtoException.class)
    public ResponseEntity<ErrorResponse> handleDtoException(
            BookDtoException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .status(HttpStatus.BAD_REQUEST)
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .exception(ex.getClass().getSimpleName())
                .message("Dto mapping failed")
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .errors(List.of(ex.getMessage()))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BookCreateException.class)
    public ResponseEntity<ErrorResponse> handleBookCreation(
            BookCreateException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .status(HttpStatus.BAD_REQUEST)
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .exception(ex.getClass().getSimpleName())
                .message("Book create failed")
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .errors(List.of(ex.getMessage()))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .status(HttpStatus.BAD_REQUEST)
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .exception(ex.getClass().getSimpleName())
                .message("Illegal Argument found")
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .errors(List.of(ex.getMessage()))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
