package com.serp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SerpAnalysisApplication {

    public static void main(String[] args) {
        SpringApplication.run(SerpAnalysisApplication.class, args);
    }
}
