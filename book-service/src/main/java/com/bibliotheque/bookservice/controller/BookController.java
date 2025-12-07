package com.bibliotheque.bookservice.controller;

import com.bibliotheque.bookservice.entity.Auteur;
import com.bibliotheque.bookservice.entity.Livre;
import com.bibliotheque.bookservice.service.BookService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Livre> getAll() {
        return bookService.getAllLivres();
    }

    @GetMapping("/{id}")
    public Livre getById(@PathVariable Long id) {
        return bookService.getLivreById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Livre create(@Valid @RequestBody Livre livre) {
        return bookService.saveLivre(livre);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Livre update(@PathVariable Long id, @Valid @RequestBody Livre livre) {
        return bookService.updateLivre(id, livre);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        bookService.deleteLivre(id);
    }

    @GetMapping("/search")
    public List<Livre> search(@RequestParam(required = false) String titre,
                              @RequestParam(required = false) String genre) {
        return bookService.search(titre, genre);
    }

    @GetMapping("/recommandations")
    public List<Livre> recommandations() {
        return bookService.getRecommandations();
    }
}

