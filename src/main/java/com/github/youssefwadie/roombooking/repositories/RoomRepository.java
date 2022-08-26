package com.github.youssefwadie.roombooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.youssefwadie.roombooking.model.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
