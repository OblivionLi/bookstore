package com.balaur.bookstore.backend.model.user;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public interface UserAddress {
    Long getId();
    void setId(Long id);

    String getStreet();
    void setStreet(String street);

    String getCity();
    void setCity(String city);

    String getState();
    void setState(String state);

    String getCountry();
    void setCountry(String country);

    String getPhoneNumber();
    void setPhoneNumber(String phoneNumber);

    String getZipcode();
    void setZipcode(String zipcode);

    boolean isDefault();
    void setDefault(boolean isDefault);
}
