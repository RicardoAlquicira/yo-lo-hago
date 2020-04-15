package com.example.autoconfig;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;

@Configuration
@ComponentScan({ "com.example.controller"})
@Slf4j
public class ControllerConfig {
	public ControllerConfig() {
		log.info("Loading autoconfig ControllerConfig");
		
	}
}
