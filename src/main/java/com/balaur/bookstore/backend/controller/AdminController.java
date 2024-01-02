package com.balaur.bookstore.backend.controller;

import com.balaur.bookstore.backend.request.book.ReviewRequest;
import com.balaur.bookstore.backend.request.order.OrderEditRequest;
import com.balaur.bookstore.backend.request.user.UserEditRequest;
import com.balaur.bookstore.backend.request.user.UserLockRequest;
import com.balaur.bookstore.backend.response.admin.book.ReviewsResponse;
import com.balaur.bookstore.backend.response.admin.role.UserRolesResponse;
import com.balaur.bookstore.backend.response.admin.user.UserResponse;
import com.balaur.bookstore.backend.response.book.BookResponse;
import com.balaur.bookstore.backend.response.order.OrderResponse;
import com.balaur.bookstore.backend.service.BookService;
import com.balaur.bookstore.backend.service.OrderService;
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
    private final OrderService orderService;
    private final BookService bookService;

    // ============= Users routes
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

    // ============= Orders routes
    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders(Authentication authentication) {
        return orderService.getAllOrders(authentication);
    }

    @DeleteMapping("/orders/{id}/delete")
    public ResponseEntity<String> deleteOrder(Authentication authentication, @PathVariable Long id) {
        return orderService.deleteOrder(authentication, id);
    }

    @PatchMapping("/orders/{id}/edit")
    public ResponseEntity<String> editOrder(Authentication authentication, @PathVariable Long id, @RequestBody @Valid OrderEditRequest request) {
        return orderService.editOrder(authentication, id, request);
    }

    // ============= Books routes
    @GetMapping("/books")
    public ResponseEntity<List<BookResponse>> getAllOrdersNoPagination(Authentication authentication) {
        return bookService.getAllOrdersNoPagination(authentication);
    }

    @DeleteMapping("/books/{id}/delete")
    public ResponseEntity<String> deleteBook(Authentication authentication, @PathVariable Long id) {
        return bookService.deleteBook(authentication, id);
    }

    // ============= Reviews routes
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewsResponse>> getAllReviews(Authentication authentication) {
        return bookService.getAllReviews(authentication);
    }

    @DeleteMapping("/reviews/{id}/delete")
    public ResponseEntity<String> deleteReview(Authentication authentication, @PathVariable Long id) {
        return bookService.deleteReview(authentication, id);
    }

    @PatchMapping("/reviews/{id}/edit")
    public ResponseEntity<String> editReview(Authentication authentication, @PathVariable Long id, @RequestBody @Valid ReviewRequest request) {
        return bookService.editReview(authentication, id, request);
    }
}
