package com.Hanna.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserManagementController {

    @GetMapping("/manage-users")
    public String getManageUsersPage() {
        return "manage-users";  // O nome do arquivo HTML sem a extensão .html
    }
}
