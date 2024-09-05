package com.Hanna.blog.controller;

import com.Hanna.blog.dto.PostDTO;
import com.Hanna.blog.exception.ResourceNotFoundException;
import com.Hanna.blog.model.Post;
import com.Hanna.blog.repository.PostRepository;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);
    private static final String UPLOAD_DIR = "src/main/resources/static/images/";

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

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

    // Método modificado para incluir o autor
    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestParam("title") String title,
                                              @RequestParam("content") String content,
                                              @RequestParam("author") String author,  // Adicionado o parâmetro author
                                              @RequestParam(value = "image", required = false) MultipartFile image) {
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = saveImage(image);
        }

        PostDTO postDTO = new PostDTO();
        postDTO.setTitle(title);
        postDTO.setContent(content);
        postDTO.setAuthor(author);  // Configurando o autor
        postDTO.setImageUrl(imageUrl != null ? "/images/" + image.getOriginalFilename() : null);

        Post post = convertToEntity(postDTO);
        post.setCreatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedPost));
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
        post.setImageUrl(postDTO.getImageUrl());

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
        postDTO.setImageUrl(post.getImageUrl());
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
        post.setImageUrl(postDTO.getImageUrl());
        return post;
    }

    private String saveImage(MultipartFile image) {
        try {
            String imagePath = UPLOAD_DIR + image.getOriginalFilename();
            Path path = Paths.get(imagePath);

            Files.createDirectories(path.getParent());  // Cria o diretório se não existir
            Files.write(path, image.getBytes());

            return imagePath;
        } catch (IOException e) {
            logger.error("Erro ao salvar a imagem.", e);
            throw new RuntimeException("Erro ao salvar a imagem.", e);
        }
    }
}
