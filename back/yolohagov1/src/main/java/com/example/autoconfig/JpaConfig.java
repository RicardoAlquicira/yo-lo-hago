package com.example.autoconfig;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableTransactionManagement(proxyTargetClass = true) 
@EnableJpaRepositories(basePackages = {"com.example.jpa"})
@EntityScan(basePackages= {"com.example.domain"})
@Slf4j
public class JpaConfig {
	public JpaConfig() {
		log.info("Loading autoconfig JpaConfig");
		
	}
}
