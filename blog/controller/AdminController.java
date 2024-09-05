package com.Hanna.blog.controller;

import com.Hanna.blog.dto.PostDTO;
import com.Hanna.blog.model.User;
import com.Hanna.blog.service.UserService;
import com.Hanna.blog.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final PostService postService;


    public AdminController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }


    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @PutMapping("/users/{id}/promote")
    public ResponseEntity<User> promoteUserToAdmin(@PathVariable Long id) {
        User updatedUser = userService.promoteUserToAdmin(id);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/posts")
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<PostDTO> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }


    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }
}
