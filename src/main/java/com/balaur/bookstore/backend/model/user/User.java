package com.balaur.bookstore.backend.model.user;

import com.balaur.bookstore.backend.model.book.BookRating;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean locked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "user_groups",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private Set<UserGroup> userGroups = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserBillingAddress> userBillingAddresses = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserShippingAddress> userShippingAddresses = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL, CascadeType.REMOVE}, orphanRemoval = true)
    private Set<BookRating> bookRatings = new HashSet<>();

    public void addUserGroups(UserGroup userGroup) {
        userGroups.add(userGroup);
        userGroup.getUsers().add(this);
    }

    public void removeUserGroup(UserGroup userGroup) {
        userGroups.remove(userGroup);
        userGroup.getUsers().remove(this);
    }
}
