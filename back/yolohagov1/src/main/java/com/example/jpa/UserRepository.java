package com.example.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findById(Long id);
	User findByEmail(String email);
}
