package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Expertis;
import com.example.domain.User;
import com.example.jpa.ExpertisRepository;
import com.example.jpa.UserRepository;

@RestController
@RequestMapping("/expertis")
public class ExpertisController {
	@Autowired
	private ExpertisRepository expertisRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping
	public @ResponseBody Long saveExpertis(@RequestBody Expertis from) {
		Expertis me = (null != from.getId()) ? expertisRepository.findById(from.getId()) : new Expertis();
		me.setExperience(from.getExperience());
		me.setYears(from.getYears());
		expertisRepository.save(me);
		User user = userRepository.findById(from.getUser().getId());
		user.setExperienced(true);
		userRepository.save(user);
		return me.getId();
	}

	@GetMapping("/user/{id}")
	public @ResponseBody List<Expertis> getExpertis(@PathVariable Long id) {
		User user = userRepository.findById(id);
		return expertisRepository.findByUser(user);
	}

}
