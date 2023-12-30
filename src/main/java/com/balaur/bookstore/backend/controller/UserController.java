package com.balaur.bookstore.backend.controller;

import com.balaur.bookstore.backend.dto.UserAddressDto;
import com.balaur.bookstore.backend.model.user.UserAddress;
import com.balaur.bookstore.backend.response.user.UserDetailsResponse;
import com.balaur.bookstore.backend.request.user.*;
import com.balaur.bookstore.backend.response.user.UserBillingAddressResponse;
import com.balaur.bookstore.backend.response.user.UserShippingAddressResponse;
import com.balaur.bookstore.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PatchMapping("/change-details")
    public ResponseEntity<UserDetailsResponse> changeDetails(Authentication authentication, @RequestBody @Valid UserChangeDetailsRequest request) {
        return userService.changeDetails(authentication, request);
    }

    @GetMapping("/shipping-address")
    public ResponseEntity<List<UserShippingAddressResponse>> getUserShippingAddress(Authentication authentication) {
        return userService.getUserShippingAddress(authentication);
    }

    @GetMapping("/default/{type}-address")
    public ResponseEntity<UserAddressDto> getDefaultAddress(Authentication authentication, @PathVariable String type) {
        return userService.getDefaultAddress(authentication, type);
    }

    @GetMapping("/billing-address")
    public ResponseEntity<List<UserBillingAddressResponse>> getUserBillingAddress(Authentication authentication) {
        return userService.getUserBillingAddress(authentication);
    }

    @PatchMapping("/address/{id}/mark-default")
    public String markUserAddressAsDefault(Authentication authentication, @PathVariable Long id, @RequestBody @Valid UserAddressMarkRequest request) {
        return userService.markUserAddressAsDefault(authentication, id, request);
    }

    @DeleteMapping("/address/{idAndType}/delete")
    public String deleteUserAddress(Authentication authentication, @PathVariable String idAndType) {
        return userService.deleteUserAddress(authentication, idAndType);
    }

    @PostMapping("/add-address")
    public ResponseEntity<String> addAddress(Authentication authentication, @RequestBody @Valid UserAddressRequest request) {
        return userService.addAddress(authentication, request);
    }

    @PatchMapping("/edit-address")
    public ResponseEntity<String> editAddress(Authentication authentication, @RequestBody @Valid UserAddressRequest request) {
        return userService.editAddress(authentication, request);
    }

    // TODO: this doesnt have a need in prod.
    @DeleteMapping("/delete/users")
    public void deleteAllUsers() {
        userService.deleteAllUsers();
    }
}
