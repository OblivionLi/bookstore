package com.balaur.bookstore.backend.factory;

import com.balaur.bookstore.backend.exception.book.BookCreateException;
import com.balaur.bookstore.backend.model.book.AudioBook;
import com.balaur.bookstore.backend.model.book.Book;
import com.balaur.bookstore.backend.model.book.EBook;
import com.balaur.bookstore.backend.model.book.NormalBook;
import com.balaur.bookstore.backend.util.AudioBookFileFormats;
import com.balaur.bookstore.backend.util.BookGenres;
import com.balaur.bookstore.backend.util.BookTypes;
import com.balaur.bookstore.backend.util.EbookFileFormats;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Slf4j
public class BookFactory {
    public Book createBook(HashMap<String, Object> mappedAttributes) {
        try {
            BookTypes type = (BookTypes) mappedAttributes.get("type");

            switch (type) {
                case BOOK -> {
                    return createNormalBook(mappedAttributes);
                }
                case EBOOK -> {
                    return createEBook(mappedAttributes);
                }
                case AUDIOBOOK -> {
                    return createAudioBook(mappedAttributes);
                }
                default -> {
                    log.error("[BookFactory] " + new Date() + " | Couldn't generate book dto because the book format is not in the list [BOOK, EBOOk, AUDIOBOOK]");
                    throw new BookCreateException("Couldn't generate book dto because the book format is not in the list [BOOK, EBOOk, AUDIOBOOK]");
                }
            }
        } catch (IllegalArgumentException | ClassCastException ex) {
            log.error("[BookFactory] " + new Date() + " | Couldn't generate book dto from request because book type is not valid.");
            throw ex;
        }
    }

    private Book createAudioBook(HashMap<String, Object> mappedAttributes) {
        AudioBook audioBook = new AudioBook();

        audioBook.setFileSize((Integer) mappedAttributes.get("fileSize"));

        AudioBookFileFormats audioFormat = AudioBookFileFormats.fromString((String) mappedAttributes.get("audioFormat"));
        audioBook.setAudioFormat(audioFormat);

        audioBook.setDuration((String) mappedAttributes.get("duration"));
        audioBook.setNarrator((String) mappedAttributes.get("narrator"));
        audioBook.setDownloadLink((String) mappedAttributes.get("downloadLink"));

        setCommonBookProperties(audioBook, mappedAttributes);

        return audioBook;
    }

    private Book createEBook(HashMap<String, Object> mappedAttributes) {
        EBook eBook = new EBook();

        EbookFileFormats fileFormat = EbookFileFormats.fromString((String) mappedAttributes.get("fileFormat"));
        eBook.setFileFormat(fileFormat);

        eBook.setFileSize((Integer) mappedAttributes.get("fileSize"));
        eBook.setDownloadLink((String) mappedAttributes.get("downloadLink"));

        setCommonBookProperties(eBook, mappedAttributes);

        return eBook;
    }

    private Book createNormalBook(HashMap<String, Object> mappedAttributes) {
        NormalBook normalBook = new NormalBook();

        normalBook.setQuantity((Integer) mappedAttributes.get("quantity"));
        normalBook.setCoverImage((String) mappedAttributes.get("coverImage"));

        setCommonBookProperties(normalBook, mappedAttributes);
        return normalBook;
    }

    private void setCommonBookProperties(Book book, HashMap<String, Object> mappedAttributes) {
        book.setIsbn((String) mappedAttributes.get("isbn"));
        book.setTitle((String) mappedAttributes.get("title"));
        book.setPublisher((String) mappedAttributes.get("publisher"));
        book.setDescription((String) mappedAttributes.get("description"));
        book.setPages((int) mappedAttributes.get("pages"));
        book.setPublicationYear((int) mappedAttributes.get("publicationYear"));
        book.setDiscount((int) mappedAttributes.get("discount"));
        book.setPrice((double) mappedAttributes.get("price"));
//        book.setAuthors((List<String>) mappedAttributes.get("authors"));
        Object authorsObj = mappedAttributes.get("authors");
        if (authorsObj instanceof List<?> authorsList) {
            if (!authorsList.isEmpty() && authorsList.get(0) instanceof String) {
                @SuppressWarnings("unchecked")
                List<String> authors = (List<String>) authorsList;
                book.setAuthors(authors);
            } else {
                log.error("[BookFactory] " + new Date() + " | Couldn't set authors because the list is empty or doesn't contain Strings");
                book.setAuthors(Collections.emptyList());
            }
        } else {
            log.error("[BookFactory] " + new Date() + " | Couldn't set authors because the 'authors' attribute is not a List");
            book.setAuthors(Collections.emptyList());
        }
//        book.setGenres((List<BookGenres>) mappedAttributes.get("genres"));
        Object genresObjs = mappedAttributes.get("genres");
        if (genresObjs instanceof List<?> genresList) {
            if (!genresList.isEmpty() && genresList.get(0) instanceof BookGenres) {
                @SuppressWarnings("unchecked")
                List<BookGenres> genres = (List<BookGenres>) genresList;
                book.setGenres(genres);
            } else {
                log.error("[BookFactory] " + new Date() + " | Couldn't set genres because the list is empty or doesn't contain Strings");
                book.setGenres(Collections.emptyList());
            }
        } else {
            log.error("[BookFactory] " + new Date() + " | Couldn't set genres because the 'genres' attribute is not a List");
            book.setGenres(Collections.emptyList());
        }
        book.setReleaseDate((Date) mappedAttributes.get("releaseDate"));
        book.setDeleted(false);

        String slug = book.getTitle().toLowerCase().replace(" ", "-");
        book.setSlug(slug);
    }
}
