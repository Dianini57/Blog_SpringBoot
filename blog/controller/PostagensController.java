package com.Hanna.blog.controller;

import com.Hanna.blog.model.Post;
import com.Hanna.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class PostagensController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/postagens")
    public String postagens(Model model) {
        List<Post> posts = postRepository.findAll(); // Carrega todas as postagens do banco
        model.addAttribute("posts", posts); // Adiciona as postagens ao modelo
        return "postagens"; // Retorna o arquivo postagens.html
    }
}
