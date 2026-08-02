package com.serp.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class PingSchedulerService {

    @Scheduled(fixedRate = 600000) // every 10 minutes
    public void pingKeepAlive() {
        System.out.println("[SERP-BACKEND] Keep-Alive Ping Executed - Thread: " + Thread.currentThread().getName());
    }
}

