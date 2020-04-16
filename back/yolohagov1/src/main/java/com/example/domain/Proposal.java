package com.example.domain;

import java.math.BigDecimal;

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
@Table(name = "Proposal")
@Getter @Setter
public class Proposal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "professionalId")
	private User professional;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "taskId")
	private ServiceOrder task;
	@Column(length = 100)
	private String notes;
	private Boolean warranty;
	private BigDecimal fare;
	private Integer estimatedTime;

}
