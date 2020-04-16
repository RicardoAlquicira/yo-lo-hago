package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.User;
import com.example.jpa.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/add")
	public @ResponseBody String addNewUser (@RequestParam String name, @RequestParam String email) {
		User n = new User();
		n.setName(name);
		n.setEmail(email);
		userRepository.save(n);
		return "Saved";
	}

	@GetMapping("/all")
	public @ResponseBody Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	@PostMapping("/login")
	public @ResponseBody User login(@RequestBody User from) {
		User user = userRepository.findByEmail(from.getEmail());
		if(user!=null) {
			if(user.getPassword().equals(from.getPassword())) {
				user.setPassword(null);
				return user;
			}
		}
		return null;
	}
}
