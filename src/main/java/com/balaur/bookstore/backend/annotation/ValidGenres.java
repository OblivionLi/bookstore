package com.balaur.bookstore.backend.annotation;

import com.balaur.bookstore.backend.validation.BookGenreValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = BookGenreValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidGenres {
    String message() default "Invalid genre in genres list";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
