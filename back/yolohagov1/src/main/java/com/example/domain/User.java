package com.example.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "User")
@Getter @Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 140)
	private String name;
	@Column(length = 80)
	private String email;
	@Column(length = 20)
	private String phone;
	private Integer age;
	@Column(length = 60)
	private String password;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "professionId")
	private Profession profession;
	private Integer experienceYears;
	@Column(length = 600)
	private String experience;
	private WorkSchedule workSchedule;
	
}
