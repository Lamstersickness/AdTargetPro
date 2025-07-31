package com.example.adapi.repository;

import com.example.adapi.model.Ad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdRepository extends JpaRepository<Ad, Long> {
    Page<Ad> findByKeywordsContainingIgnoreCase(String keyword, Pageable pageable);
}
