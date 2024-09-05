package com.Hanna.blog.controller;

import com.Hanna.blog.model.Comment;
import com.Hanna.blog.model.Post;
import com.Hanna.blog.repository.CommentRepository;
import com.Hanna.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;


    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        return ResponseEntity.ok(comment);
    }


    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        Post post = postRepository.findById(comment.getPost().getId())
                .orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post);
        return commentRepository.save(comment);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        comment.setContent(updatedComment.getContent());
        comment.setAuthor(updatedComment.getAuthor());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        return commentRepository.findById(id)
                .map(comment -> {
                    commentRepository.delete(comment);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new RuntimeException("Comment not found"));
    }
}
