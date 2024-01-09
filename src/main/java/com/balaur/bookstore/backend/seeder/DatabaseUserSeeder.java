package com.balaur.bookstore.backend.seeder;

import com.balaur.bookstore.backend.model.user.User;
import com.balaur.bookstore.backend.model.user.UserGroup;
import com.balaur.bookstore.backend.repository.user.UserGroupRepository;
import com.balaur.bookstore.backend.repository.user.UserRepository;
import com.balaur.bookstore.backend.util.user.UserRoles;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DatabaseUserSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final UserGroupRepository userGroupRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
    }

    private void seedUsers() {
        String userRoleValue = "ROLE_" + UserRoles.USER;
        UserGroup userGroup = userGroupRepository.findByCode(userRoleValue);
        if (userGroup == null) {
            UserGroup newUserGroup = new UserGroup();
            newUserGroup.setCode(userRoleValue);
            userGroup = userGroupRepository.save(newUserGroup);
        }

        String adminRoleValue = "ROLE_" + UserRoles.ADMIN;
        UserGroup adminGroup = userGroupRepository.findByCode(adminRoleValue);
        if (adminGroup == null) {
            UserGroup newAdminGroup = new UserGroup();
            newAdminGroup.setCode(adminRoleValue);
            adminGroup = userGroupRepository.save(newAdminGroup);
        }

        User user1 = createUser("user1", "User", "user1@user.com", "password", userGroup);
        User user2 = createUser("user2", "User", "user2@user.com", "password", userGroup);
        User admin = createUser("admin", "Admin", "admin@admin.com", "adminPassword", adminGroup);

        userRepository.saveAll(Set.of(user1, user2, admin));
    }

    private User createUser(String firstName, String lastName, String email, String password, UserGroup userGroup) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setLocked(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.addUserGroups(userGroup);
        return user;
    }
}
