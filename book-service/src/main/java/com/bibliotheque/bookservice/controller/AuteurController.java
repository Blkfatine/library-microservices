package com.bibliotheque.bookservice.controller;

import com.bibliotheque.bookservice.entity.Auteur;
import com.bibliotheque.bookservice.service.BookService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auteurs")
@PreAuthorize("hasRole('ADMIN')")
public class AuteurController {

    private final BookService bookService;

    public AuteurController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Auteur> getAll() {
        return bookService.getAllAuteurs();
    }

    @PostMapping
    public Auteur create(@Valid @RequestBody Auteur auteur) {
        return bookService.saveAuteur(auteur);
    }
}
