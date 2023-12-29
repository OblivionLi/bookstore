package com.balaur.bookstore.backend.util.user;

import com.balaur.bookstore.backend.model.book.BookRating;
import com.balaur.bookstore.backend.model.user.*;
import com.balaur.bookstore.backend.response.user.UserBillingAddressResponse;
import com.balaur.bookstore.backend.response.user.UserShippingAddressResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
public class UserServiceUtil {
    public static List<String> getUserGroupCodes(User user) {
        return user.getUserGroups().stream()
                .map(UserGroup::getCode)
                .toList();
    }

    public static <T> void deleteUserAddress(JpaRepository<T, Long> repository, Long addressId, String addressType) {
        Optional<T> userAddress = repository.findById(addressId);
        if (userAddress.isEmpty()) {
            log.warn("[UserService] " + new Date() + " | " + addressType + " not found.");
            throw new RuntimeException(addressType + " not found");
        }

        repository.delete(userAddress.get());
    }

    public static <T extends UserAddress> void setDefaultAddress(Set<T> userAddresses, JpaRepository<T, Long> repository, Long id, String addressType) {
        if (userAddresses.isEmpty()) {
            log.info("[UserService] " + new Date() + " | User hasn't set a " + addressType + " address yet.");
            return;
        }

        for (T address : userAddresses) {
            address.setDefault(address.getId().equals(id));
        }

        repository.saveAll(userAddresses);
    }

    public static UserBillingAddressResponse mapUserBillingAddressResponse(Set<UserBillingAddress> userBillingAddresses) {
        Optional<UserBillingAddress> defaultBillingAddressOptional = userBillingAddresses.stream()
                .filter(UserBillingAddress::isDefault)
                .findFirst();

        return defaultBillingAddressOptional.map(userBillingAddress ->
                        UserBillingAddressResponse.builder()
                                .id(userBillingAddress.getId())
                                .street(userBillingAddress.getStreet())
                                .city(userBillingAddress.getCity())
                                .state(userBillingAddress.getState())
                                .country(userBillingAddress.getCountry())
                                .phoneNumber(userBillingAddress.getPhoneNumber())
                                .zipcode(userBillingAddress.getZipcode())
                                .billingName(userBillingAddress.getBillingName())
                                .isDefault(userBillingAddress.isDefault())
                                .build())
                .orElse(null);
    }

    public static UserShippingAddressResponse mapUserShippingAddressResponse(Set<UserShippingAddress> userShippingAddresses) {
        Optional<UserShippingAddress> defaultShippingAddressOptional = userShippingAddresses.stream()
                .filter(UserShippingAddress::isDefault)
                .findFirst();

        return defaultShippingAddressOptional.map(userShippingAddress ->
                        UserShippingAddressResponse.builder()
                                .id(userShippingAddress.getId())
                                .street(userShippingAddress.getStreet())
                                .city(userShippingAddress.getCity())
                                .state(userShippingAddress.getState())
                                .country(userShippingAddress.getCountry())
                                .phoneNumber(userShippingAddress.getPhoneNumber())
                                .zipcode(userShippingAddress.getZipcode())
                                .recipientName(userShippingAddress.getRecipientName())
                                .isDefault(userShippingAddress.isDefault())
                                .build())
                .orElse(null);
    }

    public static Integer getAllUserBookRatingsCount(Set<BookRating> bookRatings) {
        return Math.toIntExact(bookRatings.size());
    }
}
