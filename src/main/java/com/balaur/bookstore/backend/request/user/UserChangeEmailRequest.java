package com.balaur.bookstore.backend.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserChangeEmailRequest {
    @NotNull(message = "User current email field can't be missing from request")
    @NotEmpty(message = "User current email field can't be empty")
    @Email(message = "User current email field must be of valid format")
    private String currentEmail;
    @NotNull(message = "User new email field can't be missing from request")
    @NotEmpty(message = "User new email field can't be empty")
    @Email(message = "User new email field must be of valid format")
    private String newEmail;
}
