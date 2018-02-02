package com.vaadin.starter.skeleton.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * The entry point of the Spring Boot application.
 */
@SpringBootApplication
public class ExampleServletInitializer extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(ExampleServletInitializer.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(ExampleServletInitializer.class);
    }

}
