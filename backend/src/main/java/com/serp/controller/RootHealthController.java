package com.serp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RootHealthController {

    @GetMapping({"/", "/health", "/ping"})
    public ResponseEntity<Map<String, Object>> rootHealthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "serp-backend");
        response.put("timestamp", System.currentTimeMillis());
        response.put("message", "SERP Multithreaded Engine is Active");
        return ResponseEntity.ok(response);
    }
}
