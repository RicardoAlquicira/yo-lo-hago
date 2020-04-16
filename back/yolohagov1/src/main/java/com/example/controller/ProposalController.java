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

import com.example.domain.Proposal;
import com.example.domain.ServiceOrder;
import com.example.domain.User;
import com.example.jpa.ProposalRepository;
import com.example.jpa.ServiceOrderRepository;
import com.example.jpa.UserRepository;

@RestController
@RequestMapping("/proposal")
public class ProposalController {
	@Autowired
	private ProposalRepository proposalRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ServiceOrderRepository serviceOrderRepository;

	@PostMapping
	public @ResponseBody Long saveProposal(@RequestBody Proposal from) {
		Proposal me = (null != from.getId()) ? proposalRepository.findById(from.getId()) : new Proposal();
		if(from.getProfessional() != null && from.getProfessional().getId() != null) {
			User professional = userRepository.findById(from.getProfessional().getId());
			me.setProfessional(professional);
		}
		if(from.getTask() != null && from.getTask().getId() != null) {
			ServiceOrder task = serviceOrderRepository.findById(from.getTask().getId());
			me.setTask(task);
		}
		me.setNotes(from.getNotes());
		me.setWarranty(from.getWarranty());
		me.setFare(from.getFare());
		me.setEstimatedTime(from.getEstimatedTime());
		proposalRepository.save(me);
		return me.getId();
	}

	@GetMapping("/task/{tid}")
	public @ResponseBody List<Proposal> getMadeOrders(@PathVariable Long tid) {
		ServiceOrder task = serviceOrderRepository.findById(tid);
		return proposalRepository.findByTask(task);
	}

}
