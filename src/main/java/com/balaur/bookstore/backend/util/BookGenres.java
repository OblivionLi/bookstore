package com.balaur.bookstore.backend.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BookGenres {
    MYSTERY("MYSTERY"),
    SCIENCE_FICTION("SCIENCE_FICTION"),
    FANTASY("FANTASY"),
    ROMANCE("ROMANCE"),
    THRILLER("THRILLER"),
    HORROR("HORROR"),
    HISTORICAL_FICTION("HISTORICAL_FICTION"),
    BIOGRAPHY("BIOGRAPHY"),
    NON_FICTION("NON_FICTION"),
    YOUNG_ADULT("YOUNG_ADULT"),
    DYSTOPIAN("DYSTOPIAN"),
    ADVENTURE("ADVENTURE"),
    SCIENCE("SCIENCE"),
    SELF_HELP("SELF_HELP"),
    FANTASY_ROMANCE("FANTASY_ROMANCE"),
    HISTORICAL_ROMANCE("HISTORICAL_ROMANCE"),
    CHILDRENS_FICTION("CHILDRENS_FICTION"),
    COMEDY("COMEDY"),
    EROTICA("EROTICA"),
    POETRY("POETRY"),
    CLASSICS("CLASSICS"),
    CONTEMPORARY("CONTEMPORARY"),
    CRIME("CRIME"),
    ESPIONAGE("ESPIONAGE"),
    FAIRY_TALES("FAIRY_TALES"),
    FAMILY("FAMILY"),
    GRAPHIC_NOVELS("GRAPHIC_NOVELS"),
    HEALTH("HEALTH"),
    HUMOR("HUMOR"),
    INSPIRATIONAL("INSPIRATIONAL"),
    LITERARY_FICTION("LITERARY_FICTION"),
    MILITARY("MILITARY"),
    PARANORMAL("PARANORMAL"),
    PHILOSOPHY("PHILOSOPHY"),
    PSYCHOLOGY("PSYCHOLOGY"),
    RELIGION("RELIGION"),
    SATIRE("SATIRE"),
    SHORT_STORIES("SHORT_STORIES"),
    SPORTS("SPORTS"),
    TRAVEL("TRAVEL"),
    TRUE_CRIME("TRUE_CRIME"),
    URBAN_FICTION("URBAN_FICTION"),
    WESTERN("WESTERN"),
    WOMENS_FICTION("WOMENS_FICTION"),
    BUSINESS("BUSINESS"),
    COOKBOOKS("COOKBOOKS"),
    CRAFTS("CRAFTS"),
    DIY("DIY"),
    FASHION("FASHION"),
    GARDENING("GARDENING");

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
