package com.balaur.bookstore.backend.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EbookFileFormats {
    EPUB("EPUB"),
    PDF("PDF"),
    MOBI("MOBI"),
    AZW("AZW"),
    AZW3("AZW3"),
    IBOOK("IBOOK"),
    TXT("TXT");

    private final String format;

    public static EbookFileFormats fromString(String value) {
        for (EbookFileFormats format : values()) {
            if (format.format.equalsIgnoreCase(value)) {
                return format;
            }
        }
        throw new IllegalArgumentException("Invalid format: " + value);
    }
}
