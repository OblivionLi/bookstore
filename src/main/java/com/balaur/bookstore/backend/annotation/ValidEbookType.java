package com.balaur.bookstore.backend.annotation;

import com.balaur.bookstore.backend.validation.EBookTypeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EBookTypeValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidEbookType {
    String message() default "Invalid ebook type";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
