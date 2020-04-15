package com.example.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableCaching
@EnableAsync
@SpringBootApplication(scanBasePackages={ "com.example.autoconfig"})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}