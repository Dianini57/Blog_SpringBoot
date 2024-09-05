package com.Hanna.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.Hanna.blog.model.DashboardModel;

@Controller
@RequestMapping("/templates")
public class DashboardController {

    @GetMapping("/dashboard")
    public ModelAndView dashboard() {
        DashboardModel dashboardModel = new DashboardModel();
        return new ModelAndView("dashboard", "dashboard", dashboardModel);
    }
}
