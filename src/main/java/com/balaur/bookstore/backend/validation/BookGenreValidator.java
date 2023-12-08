package com.balaur.bookstore.backend.validation;

import com.balaur.bookstore.backend.annotation.ValidGenres;
import com.balaur.bookstore.backend.util.BookGenres;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class BookGenreValidator implements ConstraintValidator<ValidGenres, List<BookGenres>> {
    @Override
    public void initialize(ValidGenres constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(List<BookGenres> values, ConstraintValidatorContext context) {
        if (values == null || values.isEmpty()) {
            return false;
        }

        for (BookGenres genre : values) {
            if (genre == null) {
                return false;
            }
        }
        return true;
    }
}
