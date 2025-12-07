package com.bibliotheque.userservice.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Email
    private String email;
    @NotBlank
    private String nom;
    @NotBlank
    private String password;
    private String role = "CLIENT"; // ADMIN ou CLIENT
}