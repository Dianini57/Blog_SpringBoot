package com.Hanna.blog.model;

public class DashboardModel {

    private String welcomeMessage;
    private int totalPosts;
    private int totalComments;
    private int totalUsers;


    public DashboardModel() {
        this.welcomeMessage = "Bem-vindo ao Painel de Controle";
        this.totalPosts = 0;  // Estes valores poderiam ser obtidos de um serviço ou banco de dados
        this.totalComments = 0;
        this.totalUsers = 0;
    }



    public String getWelcomeMessage() {
        return welcomeMessage;
    }

    public void setWelcomeMessage(String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
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
}
