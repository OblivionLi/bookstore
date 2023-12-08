package com.balaur.bookstore.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.List;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {
//    private static final List<String> EXCLUDED_PATHS = Arrays.asList(
//        "/api/auth/register",
//        "/api/auth/login",
//        "/api/book"
//    );
//
//    @Override
//    public boolean preHandle(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            Object handler
//    ) {
//        if (EXCLUDED_PATHS.contains(request.getRequestURI())) {
//            return true;
//        }
//
//        if (request.getUserPrincipal() == null) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return false;
//        }
//
//        return true;
//    }
}
