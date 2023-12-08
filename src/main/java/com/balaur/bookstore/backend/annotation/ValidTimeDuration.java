package com.balaur.bookstore.backend.annotation;

import com.balaur.bookstore.backend.validation.BookFileDurationValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = BookFileDurationValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTimeDuration {
    String message() default "Invalid file time duration";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
