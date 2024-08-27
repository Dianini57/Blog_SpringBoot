package com.Hanna.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.Hanna.blog.model.AdminDashboardModel;

@Controller
@RequestMapping("/templates")
public class AdminDashboardController {

    @GetMapping("/dashboard-admin")
    public ModelAndView adminDashboard() {
        AdminDashboardModel adminDashboardModel = new AdminDashboardModel(); //
        return new ModelAndView("dashboard-admin", "adminDashboard", adminDashboardModel);
    }
}
