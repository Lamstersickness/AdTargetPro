package com.example.adapi.service;

import com.example.adapi.model.Ad;
import com.example.adapi.repository.AdRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdService {
    @Autowired
    private AdRepository adRepository;

    public Ad saveAd(Ad ad) {
        return adRepository.save(ad);
    }

    public Page<Ad> searchByKeyword(String keyword, String sort, Pageable pageable) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return adRepository.findAll(pageable);
        }
        
        // Implement custom sorting logic if needed
        return adRepository.findByKeywordsContainingIgnoreCase(keyword, pageable);
    }
    public Optional<Ad> getAdById(Long id) {
        return adRepository.findById(id);
    }

    public void deleteAd(Long id) {
        adRepository.deleteById(id);
    }
    public Page<Ad> getAllAds(Pageable pageable) {
        return adRepository.findAll(pageable);
    }
    
}
