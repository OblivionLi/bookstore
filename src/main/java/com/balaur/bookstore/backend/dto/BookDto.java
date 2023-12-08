package com.balaur.bookstore.backend.dto;

import com.balaur.bookstore.backend.exception.book.BookDtoException;
import com.balaur.bookstore.backend.model.book.AudioBook;
import com.balaur.bookstore.backend.model.book.Book;
import com.balaur.bookstore.backend.model.book.EBook;
import com.balaur.bookstore.backend.model.book.NormalBook;
import com.balaur.bookstore.backend.request.book.BookCreateRequest;
import com.balaur.bookstore.backend.request.book.BookEditRequest;
import com.balaur.bookstore.backend.util.AudioBookFileFormats;
import com.balaur.bookstore.backend.util.BookTypes;
import com.balaur.bookstore.backend.util.EbookFileFormats;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.HashMap;

@Slf4j
public class BookDto {
    public static void mapEditedAttributes(Book book, BookEditRequest request) {
        if (request.getType() == null) {
            log.error("[BookDto] " + new Date() + " | Couldn't map edited book values from request because book type is not provided.");
            throw new BookDtoException("Couldn't map edited book values from request because book type is not provided.");
        }

        try {
            BookTypes type = BookTypes.valueOf(request.getType());

            switch (type) {
                case BOOK -> {
                    if (book instanceof NormalBook normalBook) {
                        if (request.getQuantity() != null) {
                            normalBook.setQuantity(request.getQuantity());
                        }
                        if (request.getCoverImage() != null) {
                            normalBook.setCoverImage(request.getCoverImage());
                        }
                    }
                }
                case EBOOK -> {
                    if (book instanceof EBook eBook) {
                        if (request.getDownloadLink() != null) {
                            eBook.setDownloadLink(request.getDownloadLink());
                        }
                        if (request.getFileFormat() != null) {
                            eBook.setFileFormat(EbookFileFormats.valueOf(request.getFileFormat()));
                        }
                        if (request.getFileSize() != null) {
                            eBook.setFileSize(request.getFileSize());
                        }
                    }
                }
                case AUDIOBOOK -> {
                    if (book instanceof AudioBook audioBook) {
                        if (request.getAudioFormat() != null) {
                            audioBook.setAudioFormat(AudioBookFileFormats.valueOf(request.getAudioFormat()));
                        }
                        if (request.getNarrator() != null) {
                            audioBook.setNarrator(request.getNarrator());
                        }
                        if (request.getDuration() != null) {
                            audioBook.setDuration(request.getDuration());
                        }
                        if (request.getFileSize() != null) {
                            audioBook.setFileSize(request.getFileSize());
                        }
                        if (request.getDownloadLink() != null) {
                            audioBook.setDownloadLink(request.getDownloadLink());
                        }
                    }
                }
                default -> {
                    log.error("[BookDto] " + new Date() + " | Couldn't map edited book values because the book format is not in the list [BOOK, EBOOK, AUDIOBOOK]");
                    throw new BookDtoException("Couldn't map edited book values because the book format is not in the list [BOOK, EBOOK, AUDIOBOOK]");
                }
            }
        } catch (IllegalArgumentException ex) {
            log.error("[BookDto] " + new Date() + " | Couldn't map edited book values from request because book type is not valid.");
            throw ex;
        }

        if (request.getTitle() != null) {
            book.setTitle(request.getTitle());
        }
        if (request.getPublisher() != null) {
            book.setPublisher(request.getPublisher());
        }
        if (request.getDescription() != null) {
            book.setDescription(request.getDescription());
        }
        if (request.getPages() != null) {
            book.setPages(request.getPages());
        }
        if (request.getPublicationYear() != null) {
            book.setPublicationYear(request.getPublicationYear());
        }
        if (request.getDiscount() != null) {
            book.setDiscount(request.getDiscount());
        }
        if (request.getPrice() != null) {
            book.setPrice(request.getPrice());
        }
        if (request.getAuthors() != null) {
            book.setAuthors(request.getAuthors());
        }
        if (request.getGenres() != null) {
            book.setGenres(request.getGenres());
        }
        if (request.getReleaseDate() != null) {
            book.setReleaseDate(request.getReleaseDate());
        }
    }

    public static HashMap<String, Object> mapAttributes(BookCreateRequest request) {
        if (request.getType() == null) {
            log.error("[BookDto] " + new Date() + " | Couldn't generate book dto from request because book type is not provided.");
            throw new BookDtoException("Couldn't generate book dto from request because book type is not provided.");
        }

        validateBookTypeFieldsValues(request);

        HashMap<String, Object> mappedAttributes = new HashMap<>();

        try {
            BookTypes type = BookTypes.valueOf(request.getType());

            switch (type) {
                case BOOK -> {
                    mappedAttributes.put("quantity", request.getQuantity());
                    mappedAttributes.put("coverImage", request.getCoverImage());
                }
                case EBOOK -> {
                    mappedAttributes.put("fileFormat", request.getFileFormat());
                    mappedAttributes.put("fileSize", request.getFileSize());
                    mappedAttributes.put("downloadLink", request.getDownloadLink());
                }
                case AUDIOBOOK -> {
                    mappedAttributes.put("fileSize", request.getFileSize());
                    mappedAttributes.put("audioFormat", request.getAudioFormat());
                    mappedAttributes.put("duration", request.getDuration());
                    mappedAttributes.put("narrator", request.getNarrator());
                    mappedAttributes.put("downloadLink", request.getDownloadLink());
                }
                default -> {
                    log.error("[BookDto] " + new Date() + " | Couldn't generate book dto because the book format is not in the list [BOOK, EBOOK, AUDIOBOOK]");
                    throw new BookDtoException("Couldn't generate book dto because the book format is not in the list [BOOK, EBOOK, AUDIOBOOK]");
                }
            }

            mappedAttributes.put("type", type);
        } catch (IllegalArgumentException ex) {
            log.error("[BookDto] " + new Date() + " | Couldn't generate book dto from request because book type is not valid.");
            throw ex;
        }

        mappedAttributes.put("isbn", request.getIsbn());
        mappedAttributes.put("title", request.getTitle());
        mappedAttributes.put("publisher", request.getPublisher());
        mappedAttributes.put("description", request.getDescription());
        mappedAttributes.put("pages", request.getPages());
        mappedAttributes.put("publicationYear", request.getPublicationYear());
        mappedAttributes.put("discount", request.getDiscount());
        mappedAttributes.put("price", request.getPrice());
        mappedAttributes.put("authors", request.getAuthors());
        mappedAttributes.put("genres", request.getGenres());
        mappedAttributes.put("releaseDate", request.getReleaseDate());

        return mappedAttributes;
    }

    private static void validateBookTypeFieldsValues(BookCreateRequest request) {
        try {
            BookTypes type = BookTypes.valueOf(request.getType());

            switch (type) {
                case BOOK -> {
                    if (request.getQuantity() == null) {
                        throw new BookDtoException("Couldn't generate book dto because the quantity is not provided");
                    }
                }
                case EBOOK -> {
                    if (request.getFileFormat() == null || request.getFileFormat().isEmpty()) {
                        throw new BookDtoException("Couldn't generate book dto because the file format is not provided");
                    }

                    if (request.getDownloadLink() == null || request.getDownloadLink().isEmpty()) {
                        throw new BookDtoException("Couldn't generate book dto because the download link is not provided");
                    }

                    if (request.getFileSize() == null) {
                        throw new BookDtoException("Couldn't generate book dto because the file size is not provided");
                    }
                }
                case AUDIOBOOK -> {
                    if (request.getAudioFormat() == null || request.getAudioFormat().isEmpty()) {
                        throw new BookDtoException("Couldn't generate book dto because the audio format is not provided");
                    }

                    if (request.getDownloadLink() == null || request.getDownloadLink().isEmpty()) {
                        throw new BookDtoException("Couldn't generate book dto because the download link is not provided");
                    }

                    if (request.getDuration() == null || request.getDuration().isEmpty()) {
                        throw new BookDtoException("Couldn't generate book dto because the duration is not provided");
                    }

                    if (request.getNarrator() == null || request.getNarrator().isEmpty()) {
                        throw new BookDtoException("Couldn't generate book dto because the narrator is not provided");
                    }

                    if (request.getFileSize() == null) {
                        throw new BookDtoException("Couldn't generate book dto because the file size is not provided");
                    }
                }
                default -> {
                    log.error("[BookDto] " + new Date() + " | Couldn't generate book dto because the book format is not in the list [BOOK, EBOOK, AUDIOBOOK]");
                    throw new BookDtoException("Couldn't generate book dto because the book format is not in the list [BOOK, EBOOK, AUDIOBOOK]");
                }
            }
        } catch (IllegalArgumentException ex) {
            log.error("[BookDto] " + new Date() + " | Couldn't generate book dto from request because book type is not valid.");
            throw ex;
        }
    }
}
