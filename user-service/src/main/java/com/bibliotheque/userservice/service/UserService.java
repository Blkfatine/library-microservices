package com.bibliotheque.userservice.service;

import com.bibliotheque.userservice.entity.User;
import com.bibliotheque.userservice.payload.LoginRequest;
import com.bibliotheque.userservice.payload.RegisterRequest;
import com.bibliotheque.userservice.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setNom(request.getNom());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole().equals("ADMIN") ? User.Role.ADMIN : User.Role.CLIENT);

        userRepository.save(user);
    }

    public User authenticate(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Mauvais identifiants"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Mauvais identifiants");
        }
        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}