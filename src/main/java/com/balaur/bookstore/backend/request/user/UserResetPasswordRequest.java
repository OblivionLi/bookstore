package com.balaur.bookstore.backend.request.user;

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
public class UserResetPasswordRequest {
    @NotNull(message = "User password field can't be missing from request")
    @NotEmpty(message = "User password field can't be empty")
    private String password;
    @NotNull(message = "User confirm password field can't be missing from request")
    @NotEmpty(message = "User confirm password field can't be empty")
    private String confirmPassword;
    @NotNull(message = "Reset password token field can't be missing from request")
    @NotEmpty(message = "Reset password token field can't be empty")
    private String token;
}
