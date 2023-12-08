package com.balaur.bookstore.backend.validation;

import com.balaur.bookstore.backend.annotation.ValidBookType;
import com.balaur.bookstore.backend.util.BookTypes;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class BookTypeValidator implements ConstraintValidator<ValidBookType, String> {
    @Override
    public void initialize(ValidBookType constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        for (BookTypes type : BookTypes.values()) {
            if (type.getFormat().equalsIgnoreCase(value)) {
                return true;
            }
        }

        return false;
    }
}
