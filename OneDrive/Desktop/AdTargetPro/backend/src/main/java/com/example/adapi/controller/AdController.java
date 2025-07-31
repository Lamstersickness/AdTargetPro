package com.example.adapi.controller;

import com.example.adapi.model.Ad;
import com.example.adapi.service.AdService;
import com.example.adapi.validation.ValidImage;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.constraints.NotBlank;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Validated
@RestController
@RequestMapping("/api/ads")
public class AdController {

    @Autowired
    private AdService adService;

    @PostMapping
    public ResponseEntity<Ad> createAd(
         @RequestParam @NotBlank String title,
         @RequestParam @NotBlank String description,
         @RequestParam @NotBlank String keywords,
         @RequestParam(value = "image", required = false) @ValidImage MultipartFile image
    ) {
        try {
            String imageUrl = null;

            if (image != null && !image.isEmpty()) {
                imageUrl = handleImageUpload(image);
            }

            Ad ad = new Ad();
            ad.setTitle(title);
            ad.setDescription(description);
            ad.setKeywords(List.of(keywords.split(",")));
            ad.setImageUrl(imageUrl);

            return ResponseEntity.ok(adService.saveAd(ad));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<Ad>> getAllAds(Pageable pageable) {
        return ResponseEntity.ok(adService.getAllAds(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Ad>> search(
        @RequestParam String keyword,
        Pageable pageable
    ) {
        return ResponseEntity.ok(adService.searchByKeyword(keyword, null, pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ad> updateAd(
        @PathVariable Long id,
        @RequestParam(required = false) String title,
        @RequestParam(required = false) String description,
        @RequestParam(required = false) String keywords,
        @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Ad existingAd = adService.getAdById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found"));

            if (title != null) existingAd.setTitle(title);
            if (description != null) existingAd.setDescription(description);
            if (keywords != null) existingAd.setKeywords(List.of(keywords.split(",")));
            
            if (image != null && !image.isEmpty()) {
                String imageUrl = handleImageUpload(image);
                existingAd.setImageUrl(imageUrl);
            }

            return ResponseEntity.ok(adService.saveAd(existingAd));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id) {
        try {
            adService.deleteAd(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String handleImageUpload(MultipartFile image) throws IOException {
        String contentType = image.getContentType();
        if (!contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        String originalFilename = image.getOriginalFilename();
        String fileExtension = FilenameUtils.getExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID() + "." + fileExtension;

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = uploadDir + uniqueFilename;
        image.transferTo(new File(filePath));
        
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(uniqueFilename)
                .toUriString();
    }
    
}
