package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.User;
import com.example.jpa.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@PostMapping("")
	public @ResponseBody Long saveUser (@RequestBody User from) {
		User me = (null != from.getId()) ? userRepository.findById(from.getId()) : new User();
		if(null == from.getId()) {
			me.setPassword(from.getPassword());
		}
		me.setName(from.getName());
		me.setEmail(from.getEmail());
		me.setPhone(from.getPhone());
		me.setAge(from.getAge());
		me.setExperienceYears(from.getExperienceYears());
		me.setExperience(from.getExperience());
		me.setWorkSchedule(from.getWorkSchedule());
		me.setIsProfessional(from.getIsProfessional());
		me.setIsClient(from.getIsClient());
		userRepository.save(me);
		return me.getId();
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
