package com.balaur.bookstore.backend.response.admin.user;

import com.balaur.bookstore.backend.response.user.UserBillingAddressResponse;
import com.balaur.bookstore.backend.response.user.UserShippingAddressResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private boolean locked;
    private UserBillingAddressResponse userBillingAddresses;
    private UserShippingAddressResponse userShippingAddress;
    private List<String> userGroupCodes;
    private Integer bookRatings;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
