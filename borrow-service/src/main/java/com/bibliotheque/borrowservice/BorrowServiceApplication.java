package com.bibliotheque.borrowservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableFeignClients
@EnableScheduling   // pour les notifications automatiques
public class BorrowServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(BorrowServiceApplication.class, args);
    }
}