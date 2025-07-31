package com.example.adapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AdapiApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(AdapiApplication.class, args);
	}

	// This makes files in the /uploads directory accessible via URL
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
			.addResourceHandler("/uploads/**")
			.addResourceLocations("file:" + System.getProperty("user.dir") + "/uploads/");
	}
}
