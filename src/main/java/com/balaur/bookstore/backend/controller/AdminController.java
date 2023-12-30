package com.balaur.bookstore.backend.controller;

import com.balaur.bookstore.backend.request.user.UserEditRequest;
import com.balaur.bookstore.backend.request.user.UserLockRequest;
import com.balaur.bookstore.backend.response.admin.role.UserRolesResponse;
import com.balaur.bookstore.backend.response.admin.user.UserResponse;
import com.balaur.bookstore.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers(Authentication authentication) {
        return userService.getAllUsers(authentication);
    }

    @GetMapping("/users/roles")
    public ResponseEntity<UserRolesResponse> getAllUsersRoles(Authentication authentication) {
        return userService.getAllUsersRoles(authentication);
    }

    @PatchMapping("/users/{id}/edit")
    public ResponseEntity<String> editUser(Authentication authentication, @PathVariable Long id, @RequestBody @Valid UserEditRequest request) {
        return userService.editUser(authentication, id, request);
    }

    @DeleteMapping("/users/{id}/delete")
    public ResponseEntity<String> deleteUser(Authentication authentication, @PathVariable Long id) {
        return userService.deleteUser(authentication, id);
    }

    @PatchMapping("/users/{id}/lock")
    public ResponseEntity<String> lockUser(Authentication authentication, @PathVariable Long id, @RequestBody @Valid UserLockRequest request) {
        return userService.lockUser(authentication, id, request);
    }
}
