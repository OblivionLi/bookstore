package com.balaur.bookstore.backend.request.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEditRequest {
    @NotNull(message = "User email field can't be missing from request")
    @NotEmpty(message = "User email field can't be empty")
    @Email(message = "User email field must be of valid format")
    private String email;
    @Size(min = 1, message = "User must be provided with at least 1 role")
    private String[] roles;

    @Override
    public String toString() {
        return "UserEditRequest{" +
                "email='" + email + '\'' +
                ", roles=" + Arrays.toString(roles) +
                '}';
    }
}
