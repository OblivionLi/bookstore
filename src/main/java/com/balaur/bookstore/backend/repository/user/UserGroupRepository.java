package com.balaur.bookstore.backend.repository.user;

import com.balaur.bookstore.backend.model.user.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    @Query("SELECT ug FROM UserGroup ug WHERE ug.code = :code")
    UserGroup findByCode(@Param("code") String code);
}
