package com.balaur.bookstore.backend.model.book;

import com.balaur.bookstore.backend.util.EbookFileFormats;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("EBOOK")
@Getter
@Setter
@NoArgsConstructor
public class EBook extends Book implements BookMandatoryActions{
    @Enumerated(EnumType.STRING)
    private EbookFileFormats fileFormat;
    private int fileSize;
    private String downloadLink;

    @Override
    public String getBookType() {
        return "ebook";
    }
}
