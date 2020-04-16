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
@Table(name = "ServiceOrder")
@Getter @Setter
public class ServiceOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "clientId")
	private User client;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "professionalId")
	private User professional;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "professionId")
	private Profession profession;
	@Column(length = 200)
	private String description;
	@Column(length = 40)
	private String latitude;
	@Column(length = 40)
	private String longitude;
	private BigDecimal price;
	private Boolean finished;
	private Integer stars;
	@Column(length = 120)
	private String feedBack;
}
