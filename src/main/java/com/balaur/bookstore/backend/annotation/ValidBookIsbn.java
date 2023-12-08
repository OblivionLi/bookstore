package com.balaur.bookstore.backend.annotation;

import com.balaur.bookstore.backend.validation.BookIsbnValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = BookIsbnValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidBookIsbn {
    String message() default "Invalid book ISBN";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
