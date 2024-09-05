package com.Hanna.blog.repository;

import com.Hanna.blog.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
    // Aqui você pode adicionar métodos personalizados para buscar imagens, se necessário.
}
