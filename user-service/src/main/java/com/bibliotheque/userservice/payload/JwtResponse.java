package com.bibliotheque.userservice.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class JwtResponse {
    private String token;
    private Long userId;
    private String email;
    private String role;
}