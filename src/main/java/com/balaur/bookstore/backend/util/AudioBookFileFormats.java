package com.balaur.bookstore.backend.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AudioBookFileFormats {
    MP3("MP3"),
    M4B("M4B"),
    AAC("AAC"),
    FLAC("FLAC"),
    WAV("WAV"),
    OGG("OGG");

    private final String format;

    public static AudioBookFileFormats fromString(String value) {
        for (AudioBookFileFormats fileFormat : values()) {
            if (fileFormat.format.equalsIgnoreCase(value)) {
                return fileFormat;
            }
        }

        throw new IllegalArgumentException("Invalid format: " + value);
    }
}
