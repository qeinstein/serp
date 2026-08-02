package com.serp.service;

import org.slf.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class PingSchedulerService {

    private static final Logger logger = LoggerFactory.getLogger(PingSchedulerService.class);

    @Scheduled(fixedRate = 600000) // every 10 minutes
    public void pingKeepAlive() {
        logger.info("SERP Backend Keep-Alive Ping Executed - Thread: {}", Thread.currentThread().getName());
    }
}
