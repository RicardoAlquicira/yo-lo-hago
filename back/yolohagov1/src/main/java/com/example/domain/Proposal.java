package com.example.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Proposal")
@Getter @Setter
public class Proposal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private User professional;
	private ServiceOrder task;
	@Column(length = 100)
	private String notes;
	private Boolean warranty;
	private BigDecimal fare;
	private Integer estimatedTime;

}
