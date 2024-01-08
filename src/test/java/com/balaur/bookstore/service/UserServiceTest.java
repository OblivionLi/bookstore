package com.balaur.bookstore.service;

import com.balaur.bookstore.backend.config.UserAuthenticationProvider;
import com.balaur.bookstore.backend.dto.UserAddressDto;
import com.balaur.bookstore.backend.exception.user.PasswordDidNotMatchException;
import com.balaur.bookstore.backend.exception.user.UserDetailsValidationFailException;
import com.balaur.bookstore.backend.exception.user.UserFoundException;
import com.balaur.bookstore.backend.model.user.*;
import com.balaur.bookstore.backend.repository.user.UserBillingAddressRepository;
import com.balaur.bookstore.backend.repository.user.UserGroupRepository;
import com.balaur.bookstore.backend.repository.user.UserRepository;
import com.balaur.bookstore.backend.repository.user.UserShippingAddressRepository;
import com.balaur.bookstore.backend.request.user.*;
import com.balaur.bookstore.backend.response.user.UserBillingAddressResponse;
import com.balaur.bookstore.backend.response.user.UserDetailsResponse;
import com.balaur.bookstore.backend.response.user.UserShippingAddressResponse;
import com.balaur.bookstore.backend.service.UserService;
import com.balaur.bookstore.backend.util.address.AddressType;
import com.balaur.bookstore.backend.util.user.UserServiceUtil;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@DataJpaTest
class UserServiceTest {
    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserGroupRepository userGroupRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private UserAuthenticationProvider userAuthenticationProvider;
    @Mock
    private UserBillingAddressRepository userBillingAddressRepository;
    @Mock
    private UserShippingAddressRepository userShippingAddressRepository;

    // ==================== Tests ====================

    @Test
    @Transactional
    @DisplayName("Test user registration with success.")
    void UserService_Register_ReturnUserDetailsResponse() {
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        when(userGroupRepository.findByCode(anyString())).thenReturn(getMockUserGroup());
        when(userRepository.save(any())).thenReturn(getMockUser());
        when(userAuthenticationProvider.createToken(any())).thenReturn("mockedToken");

        UserRegisterRequest request = new UserRegisterRequest();
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setEmail("john.doe@example.com");
        request.setPassword("password");
        request.setConfirmPassword("password");

        ResponseEntity<UserDetailsResponse> response = userService.register(request);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getToken());
    }

    @Test
    @DisplayName("Test user registration with mismatched passwords.")
    void UserService_Register_ReturnPasswordMismatch() {
        UserRegisterRequest request = new UserRegisterRequest();
        request.setPassword("password");
        request.setConfirmPassword("mismatchedPassword");

        assertThrows(PasswordDidNotMatchException.class, () -> userService.register(request));

        verify(userRepository, never()).findByEmail(anyString());
        verify(userGroupRepository, never()).findByCode(anyString());
        verify(userRepository, never()).save(any());
        verify(userAuthenticationProvider, never()).createToken(any());
    }

    @Test
    @DisplayName("Test user registration with user already existing.")
    void UserService_Register_ReturnUserAlreadyExist() {
        when(userRepository.findByEmail(anyString())).thenReturn(getMockUser());

        UserRegisterRequest request = new UserRegisterRequest();
        request.setEmail("existingUser@example.com");
        request.setPassword("password");
        request.setConfirmPassword("password");
        request.setFirstName("John");
        request.setLastName("Doe");

        assertThrows(UserFoundException.class, () -> userService.register(request));

        verify(userRepository, times(1)).findByEmail(anyString());
        verify(userGroupRepository, never()).findByCode(anyString());
        verify(userRepository, never()).save(any());
        verify(userAuthenticationProvider, never()).createToken(any());
    }

    @Test
    @DisplayName("Test user login with success.")
    void UserService_Login_ReturnUserDetailsResponse() {
        when(userRepository.findByEmail(anyString())).thenReturn(getMockUser());
        when(passwordEncoder.matches(any(CharSequence.class), anyString())).thenReturn(true);
        when(userAuthenticationProvider.createToken(any())).thenReturn("mockedToken");

        UserLoginRequest request = new UserLoginRequest();
        request.setEmail("john.doe@example.com");
        request.setPassword("password");

        ResponseEntity<UserDetailsResponse> response = userService.login(request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getToken());
    }

    @Test
    @DisplayName("Test user login when username is not found.")
    void UserService_Login_ReturnUsernameNotFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        UserLoginRequest request = new UserLoginRequest();
        request.setEmail("notFoundUser@example.com");
        request.setPassword("password");

        assertThrows(UsernameNotFoundException.class, () -> userService.login(request));

        verify(passwordEncoder, never()).matches(any(CharSequence.class), anyString());
        verify(userAuthenticationProvider, never()).createToken(any());
    }

    @Test
    @DisplayName("Test user login when passwords don't match.")
    void UserService_Login_ReturnBadCredentials() {
        when(userRepository.findByEmail(anyString())).thenReturn(getMockUser());
        when(passwordEncoder.matches(any(CharSequence.class), anyString())).thenReturn(false);

        UserLoginRequest request = new UserLoginRequest();
        request.setEmail("john.doe@example.com");
        request.setPassword("bad-password");

        assertThrows(BadCredentialsException.class, () -> userService.login(request));

        verify(userAuthenticationProvider, never()).createToken(any());
    }

    @Test
    @DisplayName("Test adding billing address with success.")
    void UserService_AddAddress_Billing_ReturnSuccess() {
        User user = getMockUser();
        String addressType = AddressType.BILLING.getFormat();

        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(userBillingAddressRepository.save(any())).thenReturn(getMockUserAddress(true, addressType));

        UserAddressRequest request = getUserAddressRequest(true, addressType);

        ResponseEntity<String> response = userService.addAddress(mockAuthentication(user), request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Billing/Shipping address added successfully.", response.getBody());

        verify(userRepository, times(1)).findByEmail(anyString());
        verify(userBillingAddressRepository, times(1)).save(any());
        verify(userShippingAddressRepository, never()).save(any());
    }

    @Test
    @DisplayName("Test adding shipping address with success.")
    void UserService_AddAddress_Shipping_ReturnSuccess() {
        User user = getMockUser();
        String addressType = AddressType.SHIPPING.getFormat();

        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(userShippingAddressRepository.save(any())).thenReturn(getMockUserAddress(true, addressType));

        UserAddressRequest request = getUserAddressRequest(true, addressType);

        ResponseEntity<String> response = userService.addAddress(mockAuthentication(user), request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Billing/Shipping address added successfully.", response.getBody());

        verify(userRepository, times(1)).findByEmail(anyString());
        verify(userBillingAddressRepository, never()).save(any());
        verify(userShippingAddressRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("Test adding billing address when user has enough addresses.")
    void UserService_AddAddress_UserHasEnoughBillingAddresses_ReturnMessage() {
        User user = getMockUser();
        user.setUserBillingAddresses(Set.of(new UserBillingAddress(), new UserBillingAddress(), new UserBillingAddress()));

        when(userRepository.findByEmail(anyString())).thenReturn(user);

        UserAddressRequest userAddressRequest = getUserAddressRequest(true, AddressType.BILLING.getFormat());
        ResponseEntity<String> response = userService.addAddress(mockAuthentication(user), userAddressRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User already has enough (3) billing addresses.", response.getBody());

        verify(userRepository, times(1)).findByEmail(anyString());
        verify(userBillingAddressRepository, never()).save(any());
        verify(userShippingAddressRepository, never()).save(any());
    }

    @Test
    @DisplayName("Test adding shipping address when user has enough addresses.")
    void UserService_AddAddress_UserHasEnoughShippingAddresses_ReturnMessage() {
        User user = getMockUser();
        user.setUserShippingAddresses(Set.of(new UserShippingAddress(), new UserShippingAddress(), new UserShippingAddress()));

        when(userRepository.findByEmail(anyString())).thenReturn(user);

        UserAddressRequest userAddressRequest = getUserAddressRequest(true, AddressType.SHIPPING.getFormat());
        ResponseEntity<String> response = userService.addAddress(mockAuthentication(user), userAddressRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User already has enough (3) shipping addresses.", response.getBody());

        verify(userRepository, times(1)).findByEmail(anyString());
        verify(userBillingAddressRepository, never()).save(any());
        verify(userShippingAddressRepository, never()).save(any());
    }

//    @Test
//    @DisplayName("Test adding addresses when an error is encountered on the server.")
//    void UserService_AddAddress_ReturnInternalServerError() {
//        when(userRepository.findByEmail(anyString())).thenReturn(getMockUser());
//        when(userBillingAddressRepository.save(any())).thenThrow(new RuntimeException("Some runtime exception"));
//
//        UserAddressRequest request = getUserAddressRequest(false, AddressType.BILLING.getFormat());
//
//        ResponseEntity<String> response = userService.addAddress(mockAuthentication(getMockUser()), request);
//
//        assertNotNull(response);
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//        assertEquals("Couldn't save billing/shipping address. Error: Some runtime exception", response.getBody());
//
//        verify(userRepository, times(1)).findByEmail(anyString());
//        verify(userBillingAddressRepository, times(1)).save(any());
//        verify(userShippingAddressRepository, never()).save(any());
//    }

    @Test
    @Transactional
    @DisplayName("Test locking user with success.")
    void UserService_LockUser_ReturnMessage() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(userRepository.findById(eq(1L))).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenReturn(user);

        UserLockRequest request = new UserLockRequest(true);
        ResponseEntity<String> response = userService.lockUser(mockAuthentication(user), user.getId(), request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("User was locked", response.getBody());
    }

    @Test
    @Transactional
    @DisplayName("Test unlocking user with success.")
    void UserService_UnlockUser_ReturnMessage() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(userRepository.findById(eq(1L))).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenReturn(user);

        UserLockRequest request = new UserLockRequest(false);
        ResponseEntity<String> response = userService.lockUser(mockAuthentication(user), user.getId(), request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("User was unlocked", response.getBody());
    }

    @Test
    @Transactional
    @DisplayName("Test locking user when not found.")
    void UserService_LockUser_ReturnUsernameNotFound() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(userRepository.findById(eq(2L))).thenReturn(Optional.empty());

        UserLockRequest request = new UserLockRequest(false);

        assertThrows(UsernameNotFoundException.class, () -> userService.lockUser(mockAuthentication(user), 2L, request));

        verify(userRepository, never()).save(any());
    }

    @Test
    @Transactional
    @DisplayName("Test deleting user when not found.")
    void UserService_DeleteUser_ReturnUsernameNotFound() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(userRepository.findById(eq(2L))).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.deleteUser(mockAuthentication(user), 2L));

        verify(userRepository, never()).delete(any());
    }

    @Test
    @Transactional
    @DisplayName("Test deleting user with success.")
    void UserService_DeleteUser_ReturnMessage() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(userRepository.findById(eq(1L))).thenReturn(Optional.of(user));

        ResponseEntity<String> response = userService.deleteUser(mockAuthentication(user), user.getId());

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("User deleted with success.", response.getBody());

        verify(userRepository, times(1)).delete(user);
    }

    @Test
    @DisplayName("Test changing user details with success")
    void UserService_ChangeDetails_ReturnUserDetailsResponse() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(user);
        when(userAuthenticationProvider.createToken(any())).thenReturn("updatedToken");

        UserChangeDetailsRequest request = new UserChangeDetailsRequest();
        request.setEmail("new.email@example.com");
        request.setFirstName("NewFirstName");
        request.setLastName("NewLastName");
        request.setPassword("newPassword");

        ResponseEntity<UserDetailsResponse> response = userService.changeDetails(mockAuthentication(user), request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(userRepository, times(1)).save(any());

        assertEquals(request.getEmail(), user.getEmail());
        assertEquals(request.getFirstName(), user.getFirstName());
        assertEquals(request.getLastName(), user.getLastName());

        UserDetailsResponse userDetailsResponse = response.getBody();

        assertNotNull(userDetailsResponse);
        assertEquals(user.getId(), userDetailsResponse.getId());
        assertEquals(user.getFirstName(), userDetailsResponse.getFirstName());
        assertEquals(user.getLastName(), userDetailsResponse.getLastName());
        assertEquals(user.getEmail(), userDetailsResponse.getEmail());
        assertNotNull(userDetailsResponse.getToken());
        assertEquals("updatedToken", userDetailsResponse.getToken());
    }

    @Test
    @DisplayName("Test changing user details with invalid email format.")
    void UserService_ChangeDetails_ReturnUserDetailsValidationFailException() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);

        UserChangeDetailsRequest request = new UserChangeDetailsRequest();
        request.setEmail("invalidEmail");

        UserDetailsValidationFailException exception = assertThrows(UserDetailsValidationFailException.class, () -> userService.changeDetails(mockAuthentication(user), request));

        assertEquals("User email has wrong format.", exception.getMessage());
    }

    @Test
    @DisplayName("Test getting a list of user shipping addresses with success.")
    void UserService_GetUserShippingAddresses_ReturnListOfShippingAddresses() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);

        ResponseEntity<List<UserShippingAddressResponse>> response = userService.getUserShippingAddress(mockAuthentication(user));

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        List<UserShippingAddressResponse> userShippingAddressResponses = response.getBody();
        assertNotNull(userShippingAddressResponses);
        assertTrue(userShippingAddressResponses.isEmpty());
    }

    @Test
    @DisplayName("Test getting a list of user billing addresses with success.")
    void UserService_GetUserBillingAddresses_ReturnListOfBillingAddresses() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);

        ResponseEntity<List<UserBillingAddressResponse>> response = userService.getUserBillingAddress(mockAuthentication(user));

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        List<UserBillingAddressResponse> userShippingAddressResponses = response.getBody();
        assertNotNull(userShippingAddressResponses);
        assertTrue(userShippingAddressResponses.isEmpty());
    }

    @Test
    @DisplayName("Test deleting a user address with success")
    void UserService_DeleteUserAddress_ReturnMessage() {
        User user = getMockUser();

        when(userRepository.findByEmail(anyString())).thenReturn(user);

        UserShippingAddress userShippingAddress = ((UserShippingAddress)getUserAddress(AddressType.SHIPPING.getFormat()));
        when(userShippingAddressRepository.findById(anyLong())).thenReturn(Optional.of(userShippingAddress));
        doNothing().when(userShippingAddressRepository).delete(any());

        String idAndType = "1:shipping";
        String response = userService.deleteUserAddress(mockAuthentication(user), idAndType);

        assertNotNull(response);
        assertEquals("User address deleted with success", response);

        verify(userShippingAddressRepository, times(1)).findById(anyLong());
        verify(userShippingAddressRepository, times(1)).delete(any());
    }

    @Test
    @DisplayName("Test deleting a user with an empty id and type param")
    void UserService_DeleteUserAddress_ReturnRuntimeExceptionInvalidIdAndTypeParam() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.deleteUserAddress(mockAuthentication(user), ""));

        assertEquals("Can't find id/type.", exception.getMessage());
    }

    @Test
    @DisplayName("Test deleting a user with invalid type param")
    void UserService_DeleteUserAddress_ReturnRuntimeExceptionInvalidTypeParam() {
        User user = getMockUser();
        when(userRepository.findByEmail(anyString())).thenReturn(user);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.deleteUserAddress(mockAuthentication(user), "1:invalidType"));

        assertEquals("Can't delete user address because type is invalid.", exception.getMessage());
    }

    @Test
    @DisplayName("Test deleting a user with invalid id")
    void UserService_DeleteUserAddress_ReturnRuntimeExceptionInvalidIdParam() {
        User user = getMockUser();
        String invalidId = "asd";
        when(userRepository.findByEmail(anyString())).thenReturn(user);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.deleteUserAddress(mockAuthentication(user), invalidId + ":shipping"));

        assertEquals("Can't delete user address because id is invalid. Error: For input string: \"" + invalidId + "\"", exception.getMessage());
    }

    // ==================== Objects Mocks ====================
    private User getMockUser() {
        User user = new User();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("encodedPassword");
        user.setLocked(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return user;
    }

    private UserGroup getMockUserGroup() {
        UserGroup userGroup = new UserGroup();
        userGroup.setCode("ROLE_USER");

        return userGroup;
    }

    private UserAddress getMockUserAddress(boolean isDefault, String addressType) {
        UserAddress userAddress = getUserAddress(addressType);

        userAddress.setId(1L);
        userAddress.setStreet("My " + addressType + " street");
        userAddress.setCity("My " + addressType + " city");
        userAddress.setState("My " + addressType + " state");
        userAddress.setCountry("My " + addressType + " country");
        userAddress.setPhoneNumber("123456789");
        userAddress.setZipcode("My " + addressType + " zip code");

        userAddress.setDefault(isDefault);

        return userAddress;
    }

    private Authentication mockAuthentication(User user) {
        UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .userGroupCodes(UserServiceUtil.getUserGroupCodes(user))
                .build();

        return new UsernamePasswordAuthenticationToken(userDetailsResponse, null);
    }

    private Authentication mockAuthenticationWithUsernameNotFoundException() {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenThrow(new UsernameNotFoundException("User not found."));
        return authentication;
    }

    // ==================== Utils ====================
    private static UserAddressRequest getUserAddressRequest(boolean isDefault, String addressType) {
        UserAddressRequest request = new UserAddressRequest();
        request.setAddressType(addressType);
        request.setStreet("My " + addressType + " street");
        request.setCity("My " + addressType + " city");
        request.setState("My " + addressType + " state");
        request.setCountry("My " + addressType + " country");
        request.setPhoneNumber("123456789");
        request.setZipcode("My " + addressType + " zip code");
        request.setBillingName("My " + addressType + " name");
        request.setDefault(isDefault);
        return request;
    }

    private static UserAddress getUserAddress(String addressType) {
        UserAddress userAddress;

        if ("billing".equals(addressType)) {
            UserBillingAddress userBillingAddress = new UserBillingAddress();
            userBillingAddress.setBillingName("My " + addressType + " name");
            userAddress = userBillingAddress;
        } else {
            UserShippingAddress userShippingAddress = new UserShippingAddress();
            userShippingAddress.setRecipientName("My " + addressType + " recipient name");
            userAddress = userShippingAddress;
        }
        return userAddress;
    }
}