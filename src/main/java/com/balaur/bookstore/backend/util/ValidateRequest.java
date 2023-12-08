package com.balaur.bookstore.backend.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidateRequest {
    public static boolean isEmailValid(String email) {
        String emailPattern = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailPattern);
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }
}
