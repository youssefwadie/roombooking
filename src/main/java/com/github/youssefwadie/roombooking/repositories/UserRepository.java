package com.github.youssefwadie.roombooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.youssefwadie.roombooking.model.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
