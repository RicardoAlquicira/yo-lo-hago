package com.example.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domain.Expertis;
import com.example.domain.User;

public interface ExpertisRepository extends JpaRepository<Expertis, Integer> {
	Expertis findById(Long id);
	List<Expertis> findByUser(User user);
}
