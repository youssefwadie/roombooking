package com.github.youssefwadie.roombooking.controllers.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.youssefwadie.roombooking.services.JWTService;

@RestController
@RequestMapping("api/basicAuth")
public class ValidateUserController {
	private final JWTService jwtService;

	public ValidateUserController(JWTService jwtService) {
		this.jwtService = jwtService;
	}

	@RequestMapping("validate")
	public ResponseEntity<Map<String, String>> userIsValid() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User currentUser = (User) auth.getPrincipal();
		
		String name = currentUser.getUsername();
		String role =  currentUser.getAuthorities().toArray()[0].toString().substring(5);
		String token = jwtService.generateToken(name, role);

		Map<String, String> response = new HashMap<>();
		response.put("token", token);
		
		return ResponseEntity.ok(response);
	}
}
