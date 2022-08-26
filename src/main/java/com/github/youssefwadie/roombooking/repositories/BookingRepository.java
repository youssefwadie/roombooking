package com.github.youssefwadie.roombooking.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.youssefwadie.roombooking.model.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findAllByDate(Date date);
}
