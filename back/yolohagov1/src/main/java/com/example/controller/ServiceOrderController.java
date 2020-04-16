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

import com.example.domain.Profession;
import com.example.domain.ServiceOrder;
import com.example.domain.User;
import com.example.jpa.ProfessionRepository;
import com.example.jpa.ServiceOrderRepository;
import com.example.jpa.UserRepository;

@RestController
@RequestMapping("/orders")
public class ServiceOrderController {
	@Autowired
	private ServiceOrderRepository orderRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ProfessionRepository professionRepository;

	@PostMapping
	public @ResponseBody Long saveOrder(@RequestBody ServiceOrder from) {
		ServiceOrder me = (null != from.getId()) ? orderRepository.findById(from.getId()) : new ServiceOrder();
		if(from.getClient()!=null && from.getClient().getId() != null) {
			User client = userRepository.findById(from.getClient().getId());
			me.setClient(client);
		}
		if(from.getProfessional() != null && from.getProfessional().getId() != null) {
			User professional = userRepository.findById(from.getProfessional().getId());
			me.setProfessional(professional);
		}
		if(from.getProfession() != null && from.getProfession().getId() != null) {
			Profession profession = professionRepository.findById(from.getProfession().getId());
			me.setProfession(profession);
		}
		me.setDescription(from.getDescription());
		me.setLatitude(from.getLatitude());
		me.setLongitude(from.getLongitude());
		me.setPrice(from.getPrice());
		me.setFinished(from.getFinished());
		me.setStars(from.getStars());
		me.setFeedBack(from.getFeedBack());
		orderRepository.save(me);
		return me.getId();
	}

	@GetMapping("/made/{id}")
	public @ResponseBody List<ServiceOrder> getMadeOrders(@PathVariable Long id) {
		User professional = userRepository.findById(id);
		return orderRepository.findByClient(professional);
	}

	@GetMapping("/assigned/{id}")
	public @ResponseBody List<ServiceOrder> getOrders(@PathVariable Long id) {
		User professional = userRepository.findById(id);
		return orderRepository.findByProfessional(professional);
	}

	@GetMapping("/finished/{id}")
	public @ResponseBody List<ServiceOrder> getFinishedOrders(@PathVariable Long id) {
		User professional = userRepository.findById(id);
		return orderRepository.findByProfessionalAndFinishedTrue(professional);
	}

	@GetMapping("/opened/{pid}")
	public @ResponseBody List<ServiceOrder> getOpenedOrders(@PathVariable Long pid) {
		Profession profession = professionRepository.findById(pid);
		return orderRepository.findByProfessionAndProfessionalIsNull(profession);
	}

}
