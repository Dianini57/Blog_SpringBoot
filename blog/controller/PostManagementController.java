package com.Hanna.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PostManagementController {

    @GetMapping("/manage-posts")
    public String getManagePostsPage() {
        return "manage-posts";  // O nome do arquivo HTML sem a extensão .html
    }
}
