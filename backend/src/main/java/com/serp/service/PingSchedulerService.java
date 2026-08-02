package com.serp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class PingSchedulerService {

    @Value("${SELF_PING_URL:https://serp-5qxj.onrender.com/health}")
    private String selfPingUrl;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Scheduled(fixedRate = 240000) // Self-ping every 4 minutes (240,000 ms) to keep Render active
    public void pingSelf() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(selfPingUrl))
                    .header("User-Agent", "SERP-Self-Ping-Service")
                    .GET()
                    .timeout(Duration.ofSeconds(10))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("[SELF-PING] Heartbeat to " + selfPingUrl + " | Status: " + response.statusCode());
        } catch (Exception e) {
            System.err.println("[SELF-PING] Heartbeat notice: " + e.getMessage());
        }
    }
}
