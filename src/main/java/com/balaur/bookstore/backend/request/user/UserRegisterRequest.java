package com.balaur.bookstore.backend.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequest {
    @NotNull(message = "User first name field can't be missing from request")
    @NotEmpty(message = "User first name field can't be empty")
    private String firstName;
    @NotNull(message = "User last name field can't be missing from request")
    @NotEmpty(message = "User last name field can't be empty")
    private String lastName;
    @NotNull(message = "User email field can't be missing from request")
    @NotEmpty(message = "User email field can't be empty")
    @Email(message = "User email field must be of valid format")
    private String email;
    @NotNull(message = "User password field can't be missing from request")
    @NotEmpty(message = "User password field can't be empty")
    private String password;
    @NotNull(message = "User confirm password field can't be missing from request")
    @NotEmpty(message = "User confirm password field can't be empty")
    private String confirmPassword;
}
