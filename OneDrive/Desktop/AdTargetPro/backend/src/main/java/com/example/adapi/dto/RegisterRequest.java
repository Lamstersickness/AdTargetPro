// src/main/java/com/example/adapi/dto/RegisterRequest.java
package com.example.adapi.dto;

public record RegisterRequest(
    String firstname,
    String lastname,
    String email,
    String password
) {}