package com.github.youssefwadie.roombooking.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.github.youssefwadie.roombooking.model.BookingCommand;
import com.github.youssefwadie.roombooking.model.Layout;
import com.github.youssefwadie.roombooking.model.entities.Booking;
import com.github.youssefwadie.roombooking.repositories.BookingRepository;
import com.github.youssefwadie.roombooking.repositories.RoomRepository;
import com.github.youssefwadie.roombooking.repositories.UserRepository;

@Controller
@RequestMapping("/bookings")
public class BookingController {

	private final BookingRepository bookingRepository;

	private final RoomRepository roomRepository;

	private final UserRepository userRepository;

	public BookingController(BookingRepository bookingRepository, RoomRepository roomRepository,
			UserRepository userRepository) {
		this.bookingRepository = bookingRepository;
		this.roomRepository = roomRepository;
		this.userRepository = userRepository;
	}

	private Map<String, Object> getBookingFormModel(Booking booking) {
		Map<String, Object> model = new HashMap<>();
		model.put("booking", new BookingCommand(booking));
		model.put("rooms", roomRepository.findAll());
		model.put("layouts", Layout.values());
		model.put("users", userRepository.findAll());
		return model;
	}

	@RequestMapping("/edit")
	public ModelAndView editBooking(@RequestParam Long id) {
		return new ModelAndView("bookings/edit", getBookingFormModel(bookingRepository.findById(id).get()));
	}

	@RequestMapping("/new")
	public ModelAndView newBooking() {
		return new ModelAndView("bookings/edit", getBookingFormModel(new Booking()));
	}

	@PostMapping("/save")
	public String save(BookingCommand booking) {
		bookingRepository.save(booking.toBooking());
		return "redirect:/";
	}

	@RequestMapping("/delete")
	public String delete(@RequestParam Long id) {
		bookingRepository.deleteById(id);
		return "redirect:/";
	}
}
