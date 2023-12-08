package com.balaur.bookstore.backend.request.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserChangeDetailsRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
