// src/main/java/com/example/adapi/repository/UserRepository.java
package com.example.adapi.repository;

import com.example.adapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}