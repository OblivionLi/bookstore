package com.balaur.bookstore.backend.validation;

import com.balaur.bookstore.backend.annotation.ValidBookIsbn;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class BookIsbnValidator implements ConstraintValidator<ValidBookIsbn, String> {
    @Override
    public void initialize(ValidBookIsbn constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }

        String cleanedValue = value.replaceAll("[^0-9]", "");

        return cleanedValue.length() == 10 || cleanedValue.length() == 13;
    }
}
