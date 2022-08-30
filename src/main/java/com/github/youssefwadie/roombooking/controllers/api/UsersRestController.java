package com.github.youssefwadie.roombooking.controllers.api;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.youssefwadie.roombooking.model.entities.User;
import com.github.youssefwadie.roombooking.repositories.UserRepository;

@RestController
@RequestMapping("api/users")
public class UsersRestController {

	private final UserRepository userRepository;

	public UsersRestController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("")
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok(userRepository.findAll());
	}

	@GetMapping("/{id:\\d+}")
	public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
		Optional<User> optionalUser = userRepository.findById(id);
		if (optionalUser.isPresent()) {
			return ResponseEntity.ok(optionalUser.get());
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("")
	public ResponseEntity<User> addUser(@RequestBody User newUser) {
		User savedUser = userRepository.save(newUser);
		System.out.println("savedUser password is = " + savedUser.getPassword());
		return ResponseEntity.ok(savedUser);
	}

	@PutMapping("")
	public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
		Optional<User> userOptional = userRepository.findById(updatedUser.getId());
		if (userOptional.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		User originalUser = userOptional.get();
		originalUser.setName(updatedUser.getName());
		User savedUser = userRepository.save(originalUser);
		return ResponseEntity.ok(savedUser);
	}

	@DeleteMapping("/{id:\\d+}")
	public void deleteUser(@PathVariable("id") Long id) {
		userRepository.deleteById(id);
	}

	@GetMapping("/resetPassword/{id:\\d+}")
	public ResponseEntity<Void> resetPassword(@PathVariable("id") Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		User user = userOptional.get();
		user.setPassword("secret");
		userRepository.save(user);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/role")
	public ResponseEntity<Map<String, String>> getCurrentUsersRole() {
		Collection<GrantedAuthority> roles = (Collection<GrantedAuthority>) SecurityContextHolder.getContext()
				.getAuthentication().getAuthorities();
		
		String role = "";
		if (roles.size() > 0) {
			GrantedAuthority ga = roles.iterator().next();
			role = ga.getAuthority().substring(5);
		}
		

		Map<String, String> responseBody = new HashMap<>();
		responseBody.put("role", role);
		return ResponseEntity.ok(responseBody);
	}
	
	@GetMapping("logout")
	public ResponseEntity<String> logout(HttpServletResponse response) {
	
		Cookie cookie = new Cookie("token", null);
		cookie.setPath("/api");
		cookie.setMaxAge(0);
		cookie.setHttpOnly(true);
		// TODO: when in production
		// cookie.setSecure(true);
		response.addCookie(cookie);

		SecurityContextHolder.getContext().setAuthentication(null);
		return ResponseEntity.ok("logged-out");
	}
	
}