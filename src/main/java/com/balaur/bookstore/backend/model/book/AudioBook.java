package com.balaur.bookstore.backend.model.book;

import com.balaur.bookstore.backend.util.AudioBookFileFormats;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("AUDIOBOOK")
@Getter
@Setter
@NoArgsConstructor
public class AudioBook extends Book implements BookMandatoryActions {
    private int fileSize;
    @Enumerated(EnumType.STRING)
    private AudioBookFileFormats audioFormat;
    private String duration;
    private String downloadLink;
    private String narrator;

    @Override
    public String getBookType() {
        return "audio";
    }
}
