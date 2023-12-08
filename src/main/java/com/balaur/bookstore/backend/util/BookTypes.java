package com.balaur.bookstore.backend.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BookTypes {
    BOOK("Book"),
    EBOOK("EBook"),
    AUDIOBOOK("AudioBook");

    private final String format;
}
