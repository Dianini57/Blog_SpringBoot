package com.Hanna.blog.model;

public class AdminDashboardModel {

    private int totalPosts;
    private int totalComments;
    private int totalUsers;


    public AdminDashboardModel() {
    }


    public AdminDashboardModel(int totalPosts, int totalComments, int totalUsers) {
        this.totalPosts = totalPosts;
        this.totalComments = totalComments;
        this.totalUsers = totalUsers;
    }


    public int getTotalPosts() {
        return totalPosts;
    }

    public void setTotalPosts(int totalPosts) {
        this.totalPosts = totalPosts;
    }

    public int getTotalComments() {
        return totalComments;
    }

    public void setTotalComments(int totalComments) {
        this.totalComments = totalComments;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(int totalUsers) {
        this.totalUsers = totalUsers;
    }

    @Override
    public String toString() {
        return "AdminDashboardModel{" +
                "totalPosts=" + totalPosts +
                ", totalComments=" + totalComments +
                ", totalUsers=" + totalUsers +
                '}';
    }
}
