package com.github.youssefwadie.roombooking.controllers.api;

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

import com.github.youssefwadie.roombooking.model.entities.Room;
import com.github.youssefwadie.roombooking.repositories.RoomRepository;

@RestController
@RequestMapping("/api/rooms")
public class RoomsRestController {
	private final RoomRepository roomRepository;

	public RoomsRestController(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}

	@GetMapping("")
	public ResponseEntity<List<Room>> getAllRooms() {
		// return ResponseEntity.status(402).build();
		// Thread.sleep(3000);
		return ResponseEntity.ok(roomRepository.findAll());
	}

	@GetMapping("/{id:\\d+}")
	public ResponseEntity<Room> getRoomById(@PathVariable("id") Long id) {
		Optional<Room> optionalRoom = roomRepository.findById(id);
		if (optionalRoom.isPresent()) {
			return ResponseEntity.ok(optionalRoom.get());
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("")
	public ResponseEntity<Room> addRoom(@RequestBody Room newRoom) {
		Room savedRoom = roomRepository.save(newRoom);
		return ResponseEntity.ok(savedRoom);
	}

	@PutMapping("")
	public ResponseEntity<Room> updateRoom(@RequestBody Room updatedRoom) {
		Optional<Room> roomOptional = roomRepository.findById(updatedRoom.getId());
		if (roomOptional.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Room originalRoom = roomOptional.get();
		originalRoom.setName(updatedRoom.getName());
		originalRoom.setLocation(updatedRoom.getLocation());
		originalRoom.setCapacities(updatedRoom.getCapacities());
		Room savedRoom = roomRepository.save(originalRoom);

		return ResponseEntity.ok(savedRoom);
	}

	@DeleteMapping("/{id:\\d+}")
	public void deleteRoom(@PathVariable("id") Long id) {
		roomRepository.deleteById(id);
	}
}
