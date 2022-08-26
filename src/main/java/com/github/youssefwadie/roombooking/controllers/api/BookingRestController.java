package com.github.youssefwadie.roombooking.controllers.api;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.youssefwadie.roombooking.model.entities.Booking;
import com.github.youssefwadie.roombooking.repositories.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
public class BookingRestController {
	private final BookingRepository bookingRepository;

	public BookingRestController(BookingRepository bookingRepository) {
		this.bookingRepository = bookingRepository;
	}
	
	@GetMapping("")
	public ResponseEntity<List<Booking>> getTodaysBookings() {
		return getAllBookings(new Date(System.currentTimeMillis()).toString());
	}
	
	@GetMapping("/{date:\\d{4}-\\d{2}-\\d{2}}")
	public ResponseEntity<List<Booking>> getAllBookings(@PathVariable("date") String date) {
		try {
			Date requestedDate = Date.valueOf(date);
			return ResponseEntity.ok(this.bookingRepository.findAllByDate(requestedDate));
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/{id:\\d+}")
	public ResponseEntity<Void> cancelBooking(@PathVariable("id") Long id) {
		boolean bookingExists = bookingRepository.existsById(id);
		if (!bookingExists) {
			return ResponseEntity.notFound().build();
		}
		bookingRepository.deleteById(id);
		return ResponseEntity.ok().build();

	}

	@GetMapping("/{id:\\d+}")
	public ResponseEntity<Booking> getBooking(@PathVariable("id") Long id) {
		Optional<Booking> bookingOptional = bookingRepository.findById(id);
		if (bookingOptional.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(bookingOptional.get());
	}

	@PostMapping("")
	public ResponseEntity<Booking> addBooking(@RequestBody Booking newBooking) {
		Booking savedBooking = bookingRepository.save(newBooking);
		return ResponseEntity.ok(savedBooking);
	}

	@PutMapping("")
	public ResponseEntity<Booking> updateBooking(@RequestBody Booking updatedBooking) {
		if (updatedBooking.getId() == null) {
			return ResponseEntity.notFound().build();
		}

		boolean exist = bookingRepository.existsById(updatedBooking.getId());

		if (!exist) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(bookingRepository.save(updatedBooking));
	}

}
