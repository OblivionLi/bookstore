package com.balaur.bookstore.backend.controller;

import com.balaur.bookstore.backend.request.user.UserForgotPassword;
import com.balaur.bookstore.backend.request.user.UserResetPasswordRequest;
import com.balaur.bookstore.backend.response.user.UserDetailsResponse;
import com.balaur.bookstore.backend.request.user.UserLoginRequest;
import com.balaur.bookstore.backend.request.user.UserRegisterRequest;
import com.balaur.bookstore.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDetailsResponse> register(@RequestBody @Valid UserRegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDetailsResponse> login(@RequestBody @Valid UserLoginRequest request) {
        return userService.login(request);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody @Valid UserForgotPassword request) {
        return userService.forgotPassword(request);
    }

    @GetMapping("/reset-password/{token}")
    public boolean getResetPasswordToken(@PathVariable String token) {
        return userService.isResetPasswordTokenValid(token);
    }

    @PatchMapping("/reset-password")
    public ResponseEntity<UserDetailsResponse> resetPassword(@RequestBody @Valid UserResetPasswordRequest request) {
        return userService.resetPassword(request);
    }
}
