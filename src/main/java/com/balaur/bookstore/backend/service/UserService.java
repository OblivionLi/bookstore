package com.balaur.bookstore.backend.service;

import com.balaur.bookstore.backend.config.UserAuthenticationProvider;
import com.balaur.bookstore.backend.dto.UserAddressDto;
import com.balaur.bookstore.backend.dto.UserAddressMappingDto;
import com.balaur.bookstore.backend.model.email.EmailDetails;
import com.balaur.bookstore.backend.model.email.EmailServiceImpl;
import com.balaur.bookstore.backend.repository.user.*;
import com.balaur.bookstore.backend.response.user.UserDetailsResponse;
import com.balaur.bookstore.backend.exception.user.*;
import com.balaur.bookstore.backend.model.user.*;
import com.balaur.bookstore.backend.request.user.*;
import com.balaur.bookstore.backend.response.user.UserBillingAddressResponse;
import com.balaur.bookstore.backend.response.user.UserShippingAddressResponse;
import com.balaur.bookstore.backend.util.address.AddressType;
import com.balaur.bookstore.backend.util.user.UserRoles;
import com.balaur.bookstore.backend.util.user.UserServiceUtil;
import com.balaur.bookstore.backend.util.ValidateRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final PasswordResetRepository passwordResetRepository;
    private final UserShippingAddressRepository userShippingAddressRepository;
    private final UserBillingAddressRepository userBillingAddressRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserGroupRepository userGroupRepository;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final EmailServiceImpl emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User with username `" + username + "` not found");
            throw new UsernameNotFoundException("User with username `" + username + "` not found");
        }

        return new UserDetailsImpl(user);
    }

    @Transactional
    public ResponseEntity<UserDetailsResponse> register(UserRegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            log.warn("[UserService] " + new Date() + " | Password and confirm password did not match.");
            throw new PasswordDidNotMatchException("Password and confirm password did not match.");
        }

        User foundUser = userRepository.findByEmail(request.getEmail());
        if (foundUser != null) {
            log.warn("[UserService] " + new Date() + " | User already exist.");
            throw new UserFoundException("User already exist.");
        }

        // TODO:: increase password validation

        String encryptedPassword = passwordEncoder.encode(request.getPassword());

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(encryptedPassword);
        newUser.setLocked(false);

        String userRoleValue = "ROLE_" + UserRoles.USER;
        UserGroup userGroup = userGroupRepository.findByCode(userRoleValue);
        if (userGroup == null) {
            UserGroup newUserGroup = new UserGroup();
            newUserGroup.setCode(userRoleValue);
            userGroup = userGroupRepository.save(newUserGroup);

            log.info("[UserService] " + new Date() + " | Created new user group: " + newUserGroup);
        }

        newUser.addUserGroups(userGroup);
        newUser = userRepository.save(newUser);

        UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                .id(newUser.getId())
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .email(newUser.getEmail())
                .userGroupCodes(UserServiceUtil.getUserGroupCodes(newUser))
                .build();

        userDetailsResponse.setToken(userAuthenticationProvider.createToken(userDetailsResponse));

        return ResponseEntity.status(HttpStatus.CREATED).body(userDetailsResponse);
    }

    public ResponseEntity<UserDetailsResponse> login(UserLoginRequest request) {
        User foundUser = userRepository.findByEmail(request.getEmail());
        if (foundUser == null) {
            log.warn("[UserService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        if (passwordEncoder.matches(CharBuffer.wrap(request.getPassword()), foundUser.getPassword())) {
            UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                    .id(foundUser.getId())
                    .firstName(foundUser.getFirstName())
                    .lastName(foundUser.getLastName())
                    .email(foundUser.getEmail())
                    .userGroupCodes(UserServiceUtil.getUserGroupCodes(foundUser))
                    .build();

            userDetailsResponse.setToken(userAuthenticationProvider.createToken(userDetailsResponse));

            return ResponseEntity.status(HttpStatus.OK).body(userDetailsResponse);
        }

        log.warn("[UserService] " + new Date() + " | User couldn't login because of bad credentials.");
        throw new BadCredentialsException("User couldn't login.");
    }

    public ResponseEntity<String> addAddress(Authentication authentication, UserAddressRequest request) {
        User user = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        try {
            if (request.getAddressType().equals(AddressType.BILLING.getFormat())) {
                if (user.getUserBillingAddresses().size() > 2) {
                    log.warn("[UserService] " + new Date() + " | User already has enough (3) billing addresses.");
                    return ResponseEntity.status(HttpStatus.OK).body("User already has enough (3) billing addresses.");
                }

                UserBillingAddress userBillingAddress = new UserBillingAddress();
                UserAddressMappingDto.mapBillingAddressAttributes(userBillingAddress, request);
                userBillingAddress.setUser(user);
                if (user.getUserBillingAddresses().isEmpty()) {
                    userBillingAddress.setDefault(true);
                }

                userBillingAddressRepository.save(userBillingAddress);
            }

            if (request.getAddressType().equals(AddressType.SHIPPING.getFormat())) {
                if (user.getUserShippingAddresses().size() > 2) {
                    log.warn("[UserService] " + new Date() + " | User already has enough (3) shipping addresses.");
                    return ResponseEntity.status(HttpStatus.OK).body("User already has enough (3) shipping addresses.");
                }

                UserShippingAddress userShippingAddress = new UserShippingAddress();
                UserAddressMappingDto.mapShippingAddressAttributes(userShippingAddress, request);
                userShippingAddress.setUser(user);
                if (user.getUserShippingAddresses().isEmpty()) {
                    userShippingAddress.setDefault(true);
                }

                userShippingAddressRepository.save(userShippingAddress);
            }

            log.info("[UserService] " + new Date() + " | User billing/shipping address added with success.");
            return ResponseEntity.status(HttpStatus.OK).body("Billing/Shipping address added successfully.");
        } catch (RuntimeException ex) {
            ex.printStackTrace();
            log.warn("[UserService] " + new Date() + " | Couldn't save billing/shipping address. Error: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Couldn't save billing/shipping address. Error: " + ex.getMessage());
        }
    }

    public ResponseEntity<String> editAddress(Authentication authentication, UserAddressRequest request) {
        User user = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        try {
            if (request.getAddressType().equals(AddressType.BILLING.getFormat())) {
                Optional<UserBillingAddress> billingAddress = userBillingAddressRepository.findById(request.getId());
                if (billingAddress.isEmpty()) {
                    log.warn("[UserService] " + new Date() + " | Couldn't find billing address.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find billing address.");
                }

                UserBillingAddress userBillingAddress = billingAddress.get();

                UserAddressMappingDto.mapBillingAddressAttributes(userBillingAddress, request);
                userBillingAddress.setUser(user);
                userBillingAddressRepository.save(userBillingAddress);
            }

            if (request.getAddressType().equals(AddressType.SHIPPING.getFormat())) {
                Optional<UserShippingAddress> shippingAddress = userShippingAddressRepository.findById(request.getId());
                if (shippingAddress.isEmpty()) {
                    log.warn("[UserService] " + new Date() + " | Couldn't find shipping address.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find shipping address.");
                }

                UserShippingAddress userShippingAddress = shippingAddress.get();
                UserAddressMappingDto.mapShippingAddressAttributes(userShippingAddress, request);
                userShippingAddress.setUser(user);
                userShippingAddressRepository.save(userShippingAddress);
            }

            log.info("[UserService] " + new Date() + " | User billing/shipping address edited with success.");
            return ResponseEntity.status(HttpStatus.OK).body("Billing/Shipping address edited successfully.");
        } catch (RuntimeException ex) {
            ex.printStackTrace();
            log.warn("[UserService] " + new Date() + " | Couldn't save billing/shipping address. Error: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Couldn't save billing/shipping address. Error: " + ex.getMessage());
        }
    }

    public ResponseEntity<String> lockUser(Authentication authentication, UserLockRequest request) {
        User user = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        // TODO:: check if user has correct role

        user.setLocked(request.isLockingUser());
        userRepository.save(user);

        String message;
        if (request.isLockingUser()) {
            message = "User was locked";
        } else {
            message = "User was unlocked";
        }

        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    public ResponseEntity<String> deleteUser(Authentication authentication, String email) {
        User user = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());
        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User not found.");
            throw new UsernameNotFoundException("User not found.");
        }

        User userToBeDeleted = userRepository.findByEmail(email);
        if (userToBeDeleted == null) {
            log.warn("[UserService] " + new Date() + " | User to be deleted not found.");
            throw new UsernameNotFoundException("User to be deleted not found.");
        }

        userRepository.delete(userToBeDeleted);

        return ResponseEntity.status(HttpStatus.OK).body("User deleted.");
    }

    public ResponseEntity<UserDetailsResponse> changeDetails(Authentication authentication, UserChangeDetailsRequest request) {
        User user = userRepository.findByEmail(((UserDetailsResponse) authentication.getPrincipal()).getEmail());

        if (request.getEmail() != null) {
            if (!ValidateRequest.isEmailValid(request.getEmail())) {
                log.warn("[UserService] " + new Date() + " | User email has wrong format.");
               throw new UserDetailsValidationFailException("User email has wrong format.");
            }

            user.setEmail(request.getEmail());
        }

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }

        if (request.getPassword() != null) {
            String password = passwordEncoder.encode(request.getPassword());
            user.setPassword(password);
        }


        try {
            userRepository.save(user);
            UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                    .id(user.getId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .userGroupCodes(UserServiceUtil.getUserGroupCodes(user))
                    .build();

            String updatedTokenWithNewEmail = userAuthenticationProvider.createToken(userDetailsResponse);
            userDetailsResponse.setToken(updatedTokenWithNewEmail);

            log.warn("[UserService] " + new Date() + " | User account details and token was updated with success.");
            return ResponseEntity.status(HttpStatus.OK).body(userDetailsResponse);
        } catch (Exception ex) {
            log.warn("[UserService] " + new Date() + " | User details change failed: " + ex.getMessage());
            throw ex;
        }
    }

    public void deleteAllUsers() {
        List<User> users = userRepository.findAll();
        userRepository.deleteAll(users);
    }

    public ResponseEntity<List<UserShippingAddressResponse>> getUserShippingAddress(Authentication authentication) {
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() +  " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() +  " not found.");
        }

        List<UserShippingAddressResponse> userShippingAddressResponses = new ArrayList<>();
        if (user.getUserShippingAddresses().isEmpty()) {
            log.info("[UserService] " + new Date() + " | User hasn't set a shipping address yet.");
            return ResponseEntity.status(HttpStatus.OK).body(userShippingAddressResponses);
        }

        for (UserShippingAddress shippingAddress : user.getUserShippingAddresses()) {
            userShippingAddressResponses.add(
                    UserShippingAddressResponse.builder()
                            .id(shippingAddress.getId())
                            .country(shippingAddress.getCountry())
                            .city(shippingAddress.getCity())
                            .state(shippingAddress.getState())
                            .street(shippingAddress.getStreet())
                            .phoneNumber(shippingAddress.getPhoneNumber())
                            .isDefault(shippingAddress.isDefault())
                            .recipientName(shippingAddress.getRecipientName())
                            .zipcode(shippingAddress.getZipcode())
                            .build()
            );
        }

        log.info("[UserService] " + new Date() + " | User shipping addresses list returned with success.");
        return ResponseEntity.status(HttpStatus.OK).body(userShippingAddressResponses);
    }

    public ResponseEntity<List<UserBillingAddressResponse>> getUserBillingAddress(Authentication authentication) {
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() +  " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() +  " not found.");
        }

        List<UserBillingAddressResponse> userBillingAddressResponses = new ArrayList<>();
        if (user.getUserBillingAddresses().isEmpty()) {
            log.info("[UserService] " + new Date() + " | User hasn't set a billing address yet.");
            return ResponseEntity.status(HttpStatus.OK).body(userBillingAddressResponses);
        }

        for (var billingAddress : user.getUserBillingAddresses()) {
            userBillingAddressResponses.add(
                    UserBillingAddressResponse.builder()
                            .id(billingAddress.getId())
                            .country(billingAddress.getCountry())
                            .city(billingAddress.getCity())
                            .state(billingAddress.getState())
                            .street(billingAddress.getStreet())
                            .phoneNumber(billingAddress.getPhoneNumber())
                            .isDefault(billingAddress.isDefault())
                            .zipcode(billingAddress.getZipcode())
                            .billingName(billingAddress.getBillingName())
                            .build()
            );
        }

        log.info("[UserService] " + new Date() + " | User billing addresses list returned with success.");
        return ResponseEntity.status(HttpStatus.OK).body(userBillingAddressResponses);
    }

    public String deleteUserAddress(Authentication authentication, String idAndType) {
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() +  " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() +  " not found.");
        }

        if (idAndType.isEmpty()) {
            log.warn("[UserService] " + new Date() + " | Can't delete user address because id/type is invalid.");
            throw new RuntimeException("Can't find id/type.");
        }

        String[] parts = idAndType.split(":");

        Long addressId;
        try {
            addressId = Long.valueOf(parts[0]);
        } catch (NumberFormatException ex) {
            log.warn("[UserService] " + new Date() + " | Can't delete user address because id is invalid.");
            throw new RuntimeException("Can't delete user address because id is invalid. Error: " + ex.getMessage());
        }

        String addressType = parts[1].toLowerCase();

        switch (addressType) {
            case "shipping" -> UserServiceUtil.deleteUserAddress(userShippingAddressRepository, addressId, addressType);
            case "billing" -> UserServiceUtil.deleteUserAddress(userBillingAddressRepository, addressId, addressType);
            default -> {
                log.warn("[UserService] " + new Date() + " | Can't delete user address because type is invalid.");
                throw new RuntimeException("Can't delete user address because type is invalid.");
            }
        }

        return "User address deleted with success";
    }

    @Transactional
    public String markUserAddressAsDefault(Authentication authentication, Long id, UserAddressMarkRequest request) {
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() +  " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() +  " not found.");
        }

        switch (request.getAddressType()) {
            case "shipping" -> UserServiceUtil.setDefaultAddress(user.getUserShippingAddresses(), userShippingAddressRepository, id, request.getAddressType());
            case "billing" -> UserServiceUtil.setDefaultAddress(user.getUserBillingAddresses(), userBillingAddressRepository, id, request.getAddressType());
            default -> {
                log.warn("[UserService] " + new Date() + " | Can't mark user address because type is invalid.");
                throw new RuntimeException("Can't mark user address because type is invalid.");
            }
        }


        log.info("[UserService] " + new Date() + " | User address marked as default with success.");
        return "Address marked as default with success.";
    }

    public ResponseEntity<UserAddressDto> getDefaultAddress(Authentication authentication, String addressType) {
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() +  " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() +  " not found.");
        }

        if (addressType.isEmpty()) {
            log.warn("[UserService] " + new Date() + " | Can't delete user address because id/type is invalid.");
            throw new RuntimeException("Can't find id/type.");
        }

        switch (addressType.toLowerCase()) {
            case "shipping" -> {
                UserShippingAddress userShippingAddress = user.getUserShippingAddresses().stream()
                        .filter(UserShippingAddress::isDefault)
                        .findFirst()
                        .orElse(null);

                if (userShippingAddress == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }

                return ResponseEntity.status(HttpStatus.OK).body(
                        UserAddressDto.builder()
                                .id(userShippingAddress.getId())
                                .isDefault(userShippingAddress.isDefault())
                                .street(userShippingAddress.getStreet())
                                .city(userShippingAddress.getCity())
                                .state(userShippingAddress.getState())
                                .country(userShippingAddress.getCountry())
                                .phoneNumber(userShippingAddress.getPhoneNumber())
                                .zipcode(userShippingAddress.getZipcode())
                                .recipientName(userShippingAddress.getRecipientName())
                                .build()
                );
            }
            case "billing" -> {
                UserBillingAddress userBillingAddress = user.getUserBillingAddresses().stream()
                        .filter(UserBillingAddress::isDefault)
                        .findFirst()
                        .orElse(null);

                if (userBillingAddress == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }

                return ResponseEntity.status(HttpStatus.OK).body(
                        UserAddressDto.builder()
                                .id(userBillingAddress.getId())
                                .isDefault(userBillingAddress.isDefault())
                                .street(userBillingAddress.getStreet())
                                .city(userBillingAddress.getCity())
                                .state(userBillingAddress.getState())
                                .country(userBillingAddress.getCountry())
                                .phoneNumber(userBillingAddress.getPhoneNumber())
                                .zipcode(userBillingAddress.getZipcode())
                                .billingName(userBillingAddress.getBillingName())
                                .build()
                );
            }
            default -> {
                log.warn("[UserService] " + new Date() + " | Can't delete user address because type is invalid.");
                throw new RuntimeException("Can't delete user address because type is invalid.");
            }
        }
    }

    public String forgotPassword(UserForgotPassword request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            log.info("[UserService] " + new Date() + " | Can't send password request to unregistered email.");
            return "Can't find user with this email: " + request.getEmail();
        }

        String resetToken = UUID.randomUUID().toString().replace("-", "").substring(0, 32);
        PasswordReset passwordReset = new PasswordReset();
        passwordReset.setToken(resetToken);
        passwordReset.setRequestedAt(LocalDateTime.now());
        passwordReset.setEmail(user.getEmail());
        passwordResetRepository.save(passwordReset);

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setSubject("Bookstore - Password Reset");
        emailDetails.setRecipient(request.getEmail());

        String mailContent = emailDetails.generateResetPasswordMail(resetToken);
        emailDetails.setMessage(mailContent);

        return emailService.sendHtmlMail(emailDetails);
    }

    public boolean isResetPasswordTokenValid(String token) {
        PasswordReset passwordReset = passwordResetRepository.findByToken(token);
        if (passwordReset == null) {
            log.info("[UserService] " + new Date() + " | Can't find token for resetting user password.");
            return false;
        }

        return true;
    }

    @Transactional
    public ResponseEntity<UserDetailsResponse> resetPassword(UserResetPasswordRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            log.warn("[UserService] " + new Date() + " | New Password and confirm password did not match.");
            throw new PasswordDidNotMatchException("New Password and confirm password did not match.");
        }

        PasswordReset passwordReset = passwordResetRepository.findByToken(request.getToken());
        if (passwordReset == null) {
            log.info("[UserService] " + new Date() + " | Can't find token for resetting user password.");
            throw new RuntimeException("Can't find token for resetting user password.");
        }

        String encryptedPassword = passwordEncoder.encode(request.getPassword());

        User foundUser = userRepository.findByEmail(passwordReset.getEmail());
        foundUser.setPassword(encryptedPassword);
        foundUser = userRepository.save(foundUser);

        UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                .id(foundUser.getId())
                .firstName(foundUser.getFirstName())
                .lastName(foundUser.getLastName())
                .email(foundUser.getEmail())
                .userGroupCodes(UserServiceUtil.getUserGroupCodes(foundUser))
                .build();

        userDetailsResponse.setToken(userAuthenticationProvider.createToken(userDetailsResponse));

        return ResponseEntity.status(HttpStatus.OK).body(userDetailsResponse);
    }
}
