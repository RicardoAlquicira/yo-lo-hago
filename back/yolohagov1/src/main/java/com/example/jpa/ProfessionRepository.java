package com.example.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domain.Profession;

public interface ProfessionRepository extends JpaRepository<Profession, Integer> {
	Profession findById(Long id);
	Profession findByName(String email);
}
