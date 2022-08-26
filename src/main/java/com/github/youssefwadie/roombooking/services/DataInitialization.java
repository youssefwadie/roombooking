package com.github.youssefwadie.roombooking.services;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.github.youssefwadie.roombooking.model.Layout;
import com.github.youssefwadie.roombooking.model.entities.Booking;
import com.github.youssefwadie.roombooking.model.entities.LayoutCapacity;
import com.github.youssefwadie.roombooking.model.entities.Room;
import com.github.youssefwadie.roombooking.model.entities.User;
import com.github.youssefwadie.roombooking.repositories.BookingRepository;
import com.github.youssefwadie.roombooking.repositories.RoomRepository;
import com.github.youssefwadie.roombooking.repositories.UserRepository;

@Service
public class DataInitialization {

	private final RoomRepository roomRepository;

	private final UserRepository userRepository;

	private final BookingRepository bookingRepository;

	public DataInitialization(RoomRepository roomRepository, UserRepository userRepository,
			BookingRepository bookingRepository) {
		this.roomRepository = roomRepository;
		this.userRepository = userRepository;
		this.bookingRepository = bookingRepository;
	}

	@EventListener(classes = ApplicationReadyEvent.class)
	public void initData() {
		long booksCount = roomRepository.count();
		if (booksCount == 0) {
			Room blueRoom = new Room("Blue meeting room", "1st Floor");
			blueRoom.setCapacity(new LayoutCapacity(Layout.BOARD, 8));
			blueRoom.setCapacity(new LayoutCapacity(Layout.THEATER, 16));
			roomRepository.save(blueRoom);

			Room redRoom = new Room("Red meeting room", "2nd Floor");
			redRoom.setCapacity(new LayoutCapacity(Layout.BOARD, 12));
			redRoom.setCapacity(new LayoutCapacity(Layout.USHAPE, 26));
			roomRepository.save(redRoom);

			Room confRoom = new Room("Main Conference Room", "1st Floor");
			confRoom.setCapacity(new LayoutCapacity(Layout.THEATER, 80));
			confRoom.setCapacity(new LayoutCapacity(Layout.USHAPE, 40));
			roomRepository.save(confRoom);

			User user = new User("Youssef", "secret");
			userRepository.save(user);

			Booking booking1 = new Booking();
			booking1.setDate(new java.sql.Date(new java.util.Date().getTime()));
			booking1.setStartTime(java.sql.Time.valueOf("11:00:00"));
			booking1.setEndTime(java.sql.Time.valueOf("11:30:00"));
			booking1.setLayout(Layout.USHAPE);
			booking1.setParticipants(8);
			booking1.setTitle("Conference call with CEO");
			booking1.setRoom(blueRoom);
			booking1.setUser(user);
			bookingRepository.save(booking1);

			Booking booking2 = new Booking();
			booking2.setDate(new java.sql.Date(new java.util.Date().getTime()));
			booking2.setStartTime(java.sql.Time.valueOf("13:00:00"));
			booking2.setEndTime(java.sql.Time.valueOf("14:30:00"));
			booking2.setLayout(Layout.BOARD);
			booking2.setParticipants(5);
			booking2.setTitle("Sales Update");
			booking2.setRoom(redRoom);
			booking2.setUser(user);
			bookingRepository.save(booking2);
		}
	}

}
