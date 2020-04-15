package com.example.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ServiceOrder")
@Getter @Setter
public class ServiceOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private User client;
	@Column(length = 200)
	private String description;
	@Column(length = 100)
	private String location;
	private DesiredTime desiredTime;
}
