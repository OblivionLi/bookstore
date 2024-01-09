package com.balaur.bookstore.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // use 13 as strength
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {
        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);

        http
                .exceptionHandling(customizer -> customizer.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new JwtAuthenticationFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // anonymous
                        .requestMatchers(
                                mvcMatcherBuilder.pattern("/api/auth/login"),
                                mvcMatcherBuilder.pattern("/api/auth/register"),
                                mvcMatcherBuilder.pattern("/api/auth/forgot-password"),
                                mvcMatcherBuilder.pattern("/api/auth/reset-password/{token}"),
                                mvcMatcherBuilder.pattern("/api/auth/reset-password"),
                                mvcMatcherBuilder.pattern("/api/book"),
                                mvcMatcherBuilder.pattern("/api/book/{slug}")
                        ).permitAll()

                        // user
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/change-details")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/shipping-address")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/default/{type}-address")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/billing-address")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/address/{id}/mark-default")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/address/{idAndType}/delete")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/add-address")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/user/edit-address")).authenticated()

                        // payment
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/payment/charge")).authenticated()

                        // orders
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/order/placeorder")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/orders")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/orders/{id}")).authenticated()

                        // book
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/book/{id}/rating")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/book/rating/{ratingId}")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/book/{id}/rating")).authenticated()
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/book/{id}/reviews")).authenticated()

                        // admin
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/users")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/users/roles")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/users/{id}/edit")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/users/{id}/delete")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/users/{id}/lock")).hasAuthority("ROLE_ADMIN")

                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/orders")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/orders/{id}/edit")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/orders/{id}/delete")).hasAuthority("ROLE_ADMIN")

                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/books")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/books/{id}/edit")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/books/{id}/delete")).hasAuthority("ROLE_ADMIN")

                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/reviews")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/reviews/{id}/edit")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/api/admin/reviews/{id}/delete")).hasAuthority("ROLE_ADMIN")

                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()
                        .anyRequest().permitAll()
                )
        ;

        return http.build();
    }
}
