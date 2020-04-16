package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Profession;
import com.example.jpa.ProfessionRepository;

@RestController
@RequestMapping("/professions")
public class ProfessionController {
	@Autowired
	private ProfessionRepository professionRepository;

	@PostMapping
	public @ResponseBody Long saveUser (@RequestBody Profession from) {
		Profession me = (null != from.getId()) ? professionRepository.findById(from.getId()) : new Profession();
		me.setName(from.getName());
		me.setDescription(from.getDescription());
		professionRepository.save(me);
		return me.getId();
	}

	@GetMapping
	public @ResponseBody Iterable<Profession> getAllUsers() {
		return professionRepository.findAll();
	}

}
