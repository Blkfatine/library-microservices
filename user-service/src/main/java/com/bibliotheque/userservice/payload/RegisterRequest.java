package com.bibliotheque.userservice.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {
    @NotBlank @Email
    private String email;
    @NotBlank
    private String nom;
    @NotBlank
    private String password;
    private String role = "CLIENT";

    public RegisterRequest() {}

    public RegisterRequest(String email, String nom, String password, String role) {
        this.email = email;
        this.nom = nom;
        this.password = password;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}