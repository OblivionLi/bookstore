package com.balaur.bookstore.backend.model.book;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@DiscriminatorValue("NORMALBOOK")
@Getter
@Setter
@NoArgsConstructor
public class NormalBook extends Book implements BookMandatoryActions {
    private int quantity;
    private String coverImage;

    @Override
    public String getBookType() {
        return "physical book";
    }
}
