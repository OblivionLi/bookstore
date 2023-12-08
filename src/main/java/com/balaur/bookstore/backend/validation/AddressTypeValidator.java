package com.balaur.bookstore.backend.validation;

import com.balaur.bookstore.backend.annotation.ValidAddressType;
import com.balaur.bookstore.backend.util.BookTypes;
import com.balaur.bookstore.backend.util.address.AddressType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AddressTypeValidator implements ConstraintValidator<ValidAddressType, String> {
    @Override
    public void initialize(ValidAddressType constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        for (AddressType type : AddressType.values()) {
            if (type.getFormat().equalsIgnoreCase(value)) {
                return true;
            }
        }

        return false;
    }
}
