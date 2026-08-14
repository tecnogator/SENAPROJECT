package com.olympusgym;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.olympusgym"})
public class OlympusgymApplication {
    public static void main(String[] args) {
        SpringApplication.run(OlympusgymApplication.class, args);
    }
}