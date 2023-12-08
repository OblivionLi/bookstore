package com.balaur.bookstore.backend.dto;

import com.balaur.bookstore.backend.model.user.UserBillingAddress;
import com.balaur.bookstore.backend.model.user.UserShippingAddress;
import com.balaur.bookstore.backend.request.user.UserAddressRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserAddressDto {
    public static UserBillingAddress mapBillingAddressAttributes(UserBillingAddress userBillingAddress, UserAddressRequest request) {

        if (request.getCity() != null && !request.getCity().isEmpty()) {
            userBillingAddress.setCity(request.getCity());
        }

        if (request.getStreet() != null && !request.getStreet().isEmpty()) {
            userBillingAddress.setStreet(request.getStreet());
        }

        if (request.getState() != null && !request.getState().isEmpty()) {
            userBillingAddress.setState(request.getState());
        }

        if (request.getCountry() != null && !request.getCountry().isEmpty()) {
            userBillingAddress.setCountry(request.getCountry());
        }

        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            userBillingAddress.setPhoneNumber(request.getPhoneNumber());
        }

        if (request.getZipcode() != null && !request.getZipcode().isEmpty()) {
            userBillingAddress.setZipcode(request.getZipcode());
        }

        if (request.getBillingName() != null && !request.getBillingName().isEmpty()) {
            userBillingAddress.setBillingName(request.getBillingName());
        }

        userBillingAddress.setDefault(request.isDefault());

        return userBillingAddress;
    }

    public static UserShippingAddress mapShippingAddressAttributes(UserShippingAddress userShippingAddress, UserAddressRequest request) {
        if (request.getCity() != null && !request.getCity().isEmpty()) {
            userShippingAddress.setCity(request.getCity());
        }

        if (request.getStreet() != null && !request.getStreet().isEmpty()) {
            userShippingAddress.setStreet(request.getStreet());
        }

        if (request.getState() != null && !request.getState().isEmpty()) {
            userShippingAddress.setState(request.getState());
        }

        if (request.getRecipientName() != null && !request.getRecipientName().isEmpty()) {
            userShippingAddress.setRecipientName(request.getRecipientName());
        }

        if (request.getCountry() != null && !request.getCountry().isEmpty()) {
            userShippingAddress.setCountry(request.getCountry());
        }

        if (request.getZipcode() != null && !request.getZipcode().isEmpty()) {
            userShippingAddress.setZipcode(request.getZipcode());
        }

        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            userShippingAddress.setPhoneNumber(request.getPhoneNumber());
        }

        if (request.getDeliveryNotes() != null && !request.getDeliveryNotes().isEmpty()) {
            userShippingAddress.setDeliveryNotes(request.getDeliveryNotes());
        }

        userShippingAddress.setDefault(request.isDefault());

        return userShippingAddress;
    }
}
