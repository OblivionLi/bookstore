package com.balaur.bookstore.backend.validation;

import com.balaur.bookstore.backend.annotation.ValidTimeDuration;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class BookFileDurationValidator implements ConstraintValidator<ValidTimeDuration, String> {
    @Override
    public void initialize(ValidTimeDuration constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }

        String[] parts = value.split(":");
        if (parts.length != 3) {
            return false;
        }

        try {
            int hours = Integer.parseInt(parts[0]);
            int minutes = Integer.parseInt(parts[1]);
            int seconds = Integer.parseInt(parts[2]);

            return hours <= 10 && minutes < 60 && seconds < 60;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
