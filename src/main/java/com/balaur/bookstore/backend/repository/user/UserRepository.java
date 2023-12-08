package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = :username")
    User findByEmail(@Param("username") String username);
}
