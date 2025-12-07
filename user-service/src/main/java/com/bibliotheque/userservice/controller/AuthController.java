package com.bibliotheque.userservice.controller;

import com.bibliotheque.userservice.entity.User;
import com.bibliotheque.userservice.payload.*;
import com.bibliotheque.userservice.service.JwtService;
import com.bibliotheque.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok(new MessageResponse("Utilisateur créé avec succès !"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.authenticate(request);
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new JwtResponse(token, user.getId(), user.getEmail(), user.getRole().name()));
    }
}