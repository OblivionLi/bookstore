package com.balaur.bookstore.backend.request.user;

import com.balaur.bookstore.backend.annotation.ValidAddressType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressMarkRequest {
    @ValidAddressType
    private String addressType;
}
