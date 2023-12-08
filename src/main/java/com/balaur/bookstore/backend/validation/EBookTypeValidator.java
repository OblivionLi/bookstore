package com.balaur.bookstore.backend.validation;

import com.balaur.bookstore.backend.annotation.ValidEbookType;
import com.balaur.bookstore.backend.util.EbookFileFormats;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class EBookTypeValidator implements ConstraintValidator<ValidEbookType, String> {
    @Override
    public void initialize(ValidEbookType constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        for (EbookFileFormats type : EbookFileFormats.values()) {
            if (type.getFormat().equalsIgnoreCase(value)) {
                return true;
            }
        }

        return false;
    }
}
