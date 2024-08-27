package com.Hanna.blog.controller;

import com.Hanna.blog.dto.PostDTO;
import com.Hanna.blog.exception.ResourceNotFoundException;
import com.Hanna.blog.model.Post;
import com.Hanna.blog.repository.PostRepository;
import org.hibernate.Hibernate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;

    // Injeção de dependências via construtor
    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    // Rota pública: Retorna todos os posts
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<PostDTO> posts = postRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(posts);
    }


    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        Hibernate.initialize(post.getTags());

        return ResponseEntity.ok(convertToDTO(post));
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDTO) {
        Post post = convertToEntity(postDTO);
        post.setCreatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        return ResponseEntity.status(201).body(convertToDTO(savedPost));
    }


    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setAuthor(postDTO.getAuthor());
        post.setSummary(postDTO.getSummary());
        post.setTags(postDTO.getTags());

        Post updatedPost = postRepository.save(post);
        return ResponseEntity.ok(convertToDTO(updatedPost));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        postRepository.delete(post);
        return ResponseEntity.ok().build();
    }


    private PostDTO convertToDTO(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setAuthor(post.getAuthor());
        postDTO.setSummary(post.getSummary());
        postDTO.setCreatedAt(post.getCreatedAt());
        postDTO.setTags(post.getTags());
        return postDTO;
    }


    private Post convertToEntity(PostDTO postDTO) {
        Post post = new Post();
        post.setId(postDTO.getId());
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setAuthor(postDTO.getAuthor());
        post.setSummary(postDTO.getSummary());
        post.setTags(postDTO.getTags());
        return post;
    }
}
