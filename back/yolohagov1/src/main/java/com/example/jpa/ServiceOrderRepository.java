package com.example.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domain.Profession;
import com.example.domain.ServiceOrder;
import com.example.domain.User;

public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Integer> {
	ServiceOrder findById(Long id);
	List<ServiceOrder> findByClient(User client);
	List<ServiceOrder> findByProfessional(User professional);
	List<ServiceOrder> findByProfessionalAndFinishedTrue(User professional);
	List<ServiceOrder> findByProfessionAndProfessionalIsNull(Profession profession);
}
