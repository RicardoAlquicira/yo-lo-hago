package com.example.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domain.Proposal;
import com.example.domain.ServiceOrder;
import com.example.domain.User;

public interface ProposalRepository extends JpaRepository<Proposal, Integer> {
	Proposal findById(Long id);
	List<Proposal> findByProfessional(User professional);
	List<Proposal> findByTask(ServiceOrder task);
}
