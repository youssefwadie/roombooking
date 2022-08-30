package com.github.youssefwadie.roombooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.youssefwadie.roombooking.model.entities.User;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("FROM User WHERE name = ?1")
    Optional<User> findByName(String name);
}
