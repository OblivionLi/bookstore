package com.balaur.bookstore.backend.model.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

public class UserDetailsImpl implements UserDetails {
    private final String firstName;
    private final String lastName;
    private final String password;
    private final String email;
    private final boolean isLocked;
    private final Set<UserGroup> userGroup;

    public UserDetailsImpl(User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.isLocked = user.isLocked();
        this.userGroup = user.getUserGroups();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<UserGroup> userGroups = userGroup;
        Collection<GrantedAuthority> authorities = new ArrayList<>(userGroups.size());
        for (UserGroup userGroup : userGroups) {
            authorities.add(new SimpleGrantedAuthority(userGroup.getCode().toUpperCase()));
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
