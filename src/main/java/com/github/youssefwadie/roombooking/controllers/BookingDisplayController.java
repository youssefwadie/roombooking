package com.github.youssefwadie.roombooking.controllers;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.github.youssefwadie.roombooking.model.DateRequestCommand;
import com.github.youssefwadie.roombooking.repositories.BookingRepository;

@Controller
public class BookingDisplayController {

	private final BookingRepository bookingRepository;

	public BookingDisplayController(BookingRepository bookingRepository) {
		this.bookingRepository = bookingRepository;
	}

	private ModelAndView showCalendar(Date date) {
		Map<String, Object> model = new HashMap<>();
		model.put("dateRequest", new DateRequestCommand(date));
		model.put("bookings", bookingRepository.findAllByDate(date));
		return new ModelAndView("home", model);
	}

	@RequestMapping("")
	public ModelAndView homePage() {
		Date date = new Date(new java.util.Date().getTime());
		return showCalendar(date);
	}

	@RequestMapping("/calendar")
	public ModelAndView calendar(@RequestParam Date date) {
		return showCalendar(date);
	}

}
