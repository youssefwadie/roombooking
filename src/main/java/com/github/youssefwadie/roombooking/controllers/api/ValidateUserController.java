package com.github.youssefwadie.roombooking.controllers.api;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import com.github.youssefwadie.roombooking.model.entities.User;
import com.github.youssefwadie.roombooking.security.RoomBookingUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.youssefwadie.roombooking.security.JWTService;

@RestController
@RequestMapping("api/basicAuth")
public class ValidateUserController {
	private final JWTService jwtService;

	public ValidateUserController(JWTService jwtService) {
		this.jwtService = jwtService;
	}

	@RequestMapping("validate")
	public ResponseEntity<Map<String, String>> userIsValid(HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User currentUser = ((RoomBookingUserDetails) auth.getPrincipal()).getUser();

		String name = currentUser.getName();
		String role = currentUser.getRole().substring(5);
		String token = jwtService.generateToken(name, role);
		Cookie cookie = new Cookie("token", token);
		cookie.setPath("/api");
		cookie.setMaxAge((int) (jwtService.getExpirationTime() / 1000));
		cookie.setHttpOnly(true);
		// TODO: when in production
		// cookie.setSecure(true);

		response.addCookie(cookie);

		Map<String, String> responseBody = new HashMap<>();
		responseBody.put("result", "ok");

		return ResponseEntity.ok(responseBody);
	}
}
