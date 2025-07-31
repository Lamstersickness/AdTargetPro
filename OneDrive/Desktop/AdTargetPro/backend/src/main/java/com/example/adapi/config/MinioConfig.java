package com.example.adapi.config;

import io.minio.MinioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint("http://localhost:9000") // Replace with your MinIO URL
                .credentials("minioadmin", "minioadmin") // Default credentials
                .build();
    }
}
