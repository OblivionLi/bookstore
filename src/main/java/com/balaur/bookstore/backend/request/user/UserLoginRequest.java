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
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginRequest {
    @NotNull(message = "User email field can't be missing from request")
    @NotEmpty(message = "User email field can't be empty")
    @Email(message = "User email field must be of valid format")
    private String email;
    @NotNull(message = "User password field can't be missing from request")
    @NotEmpty(message = "User password field can't be empty")
    private String password;
}
