package com.github.youssefwadie.roombooking.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.github.youssefwadie.roombooking.model.entities.Room;
import com.github.youssefwadie.roombooking.repositories.RoomRepository;

@Controller
@RequestMapping("/rooms")
public class RoomController {

	private final RoomRepository roomRepository;

	public RoomController(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}

	@RequestMapping("")
	public ModelAndView listRooms() {
		return new ModelAndView("rooms/list", "rooms", roomRepository.findAll());
	}

	@RequestMapping("/add")
	public ModelAndView addRoom() {
		Map<String, Object> model = new HashMap<>();
		model.put("room", new Room("", ""));
		return new ModelAndView("rooms/edit", model);
	}

	@RequestMapping("/edit")
	public ModelAndView editRoom(@RequestParam Long roomId) {
		Room room = roomRepository.findById(roomId).get();
		Map<String, Object> model = new HashMap<>();
		model.put("room", room);
		return new ModelAndView("rooms/edit", model);
	}

	@PostMapping("/save")
	public Object saveRoom(@Valid Room room, BindingResult bindingResult, RedirectAttributes attributes) {

		if (bindingResult.hasErrors()) {
			Map<String, Object> model = new HashMap<>();
			model.put("room", room);
			return new ModelAndView("rooms/edit", model);
		}

		roomRepository.save(room);
		return "redirect:/rooms";
	}

	@RequestMapping("/delete")
	public String deleteRoom(@RequestParam Long roomId) {
		roomRepository.deleteById(roomId);
		return "redirect:/rooms";
	}
}
