package com.balaur.bookstore.backend.request.user;

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
public class UserChangePasswordRequest {
    @NotNull(message = "User old password field can't be missing from request")
    @NotEmpty(message = "User old password field can't be empty")
    private String oldPassword;
    @NotNull(message = "User new password field can't be missing from request")
    @NotEmpty(message = "User new password field can't be empty")
    private String newPassword;
    @NotNull(message = "User confirm password field can't be missing from request")
    @NotEmpty(message = "User confirm password field can't be empty")
    private String confirmPassword;
}
