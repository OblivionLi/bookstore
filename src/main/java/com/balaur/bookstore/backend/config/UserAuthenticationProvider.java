package com.balaur.bookstore.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.balaur.bookstore.backend.response.user.UserDetailsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    public String createToken(UserDetailsResponse userDetailsResponse) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000);

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        return JWT.create()
                .withSubject(userDetailsResponse.getEmail())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("firstName", userDetailsResponse.getFirstName())
                .withClaim("lastName", userDetailsResponse.getLastName())
                .withClaim("roles", userDetailsResponse.getUserGroupCodes())
                .sign(algorithm);
    }



    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT decodedJWT = verifier.verify(token);

        UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                .email(decodedJWT.getSubject())
                .firstName(decodedJWT.getClaim("firstName").asString())
                .lastName(decodedJWT.getClaim("lastName").asString())
                .build();

        return new UsernamePasswordAuthenticationToken(userDetailsResponse, null, Collections.emptyList());
    }

    public Authentication validateTokenStrongly(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);

            JWTVerifier verifier = JWT.require(algorithm)
                    .build();

            DecodedJWT decodedJWT = verifier.verify(token);

            UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                    .email(decodedJWT.getSubject())
                    .firstName(decodedJWT.getClaim("firstName").asString())
                    .lastName(decodedJWT.getClaim("lastName").asString())
                    .build();

            return new UsernamePasswordAuthenticationToken(userDetailsResponse, null, Collections.emptyList());
        } catch (JWTVerificationException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Token validation failed", ex);
        }
    }
}
