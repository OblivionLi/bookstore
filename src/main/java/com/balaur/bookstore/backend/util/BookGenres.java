package com.balaur.bookstore.backend.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BookGenres {
    MYSTERY("Mystery"),
    SCIENCE_FICTION("Science Fiction"),
    FANTASY("Fantasy"),
    ROMANCE("Romance"),
    THRILLER("Thriller"),
    HORROR("Horror"),
    HISTORICAL_FICTION("Historical Fiction"),
    BIOGRAPHY("Biography"),
    NON_FICTION("Non-Fiction"),
    YOUNG_ADULT("Young Adult"),
    DYSTOPIAN("Dystopian"),
    ADVENTURE("Adventure"),
    SCIENCE("Science"),
    SELF_HELP("Self-Help"),
    FANTASY_ROMANCE("Fantasy Romance"),
    HISTORICAL_ROMANCE("Historical Romance"),
    CHILDRENS_FICTION("Children's Fiction"),
    COMEDY("Comedy"),
    EROTICA("Erotica"),
    POETRY("Poetry"),
    CLASSICS("Classics"),
    CONTEMPORARY("Contemporary"),
    CRIME("Crime"),
    ESPIONAGE("Espionage"),
    FAIRY_TALES("Fairy Tales"),
    FAMILY("Family"),
    GRAPHIC_NOVELS("Graphic Novels"),
    HEALTH("Health"),
    HUMOR("Humor"),
    INSPIRATIONAL("Inspirational"),
    LITERARY_FICTION("Literary Fiction"),
    MILITARY("Military"),
    PARANORMAL("Paranormal"),
    PHILOSOPHY("Philosophy"),
    PSYCHOLOGY("Psychology"),
    RELIGION("Religion"),
    SATIRE("Satire"),
    SHORT_STORIES("Short Stories"),
    SPORTS("Sports"),
    TRAVEL("Travel"),
    TRUE_CRIME("True Crime"),
    URBAN_FICTION("Urban Fiction"),
    WESTERN("Western"),
    WOMENS_FICTION("Women's Fiction"),
    BUSINESS("Business"),
    COOKBOOKS("Cookbooks"),
    CRAFTS("Crafts"),
    DIY("DIY"),
    FASHION("Fashion"),
    GARDENING("Gardening");

    private final String format;

    public static BookGenres fromString(String value) {
        for (BookGenres genre : values()) {
            if (genre.format.equalsIgnoreCase(value)) {
                return genre;
            }
        }

        throw new IllegalArgumentException("Invalid format: " + value);
    }
}
