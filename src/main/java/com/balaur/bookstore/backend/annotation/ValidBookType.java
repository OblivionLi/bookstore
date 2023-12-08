package com.balaur.bookstore.backend.annotation;

import com.balaur.bookstore.backend.validation.BookTypeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = BookTypeValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidBookType {
    String message() default "Invalid book type";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
