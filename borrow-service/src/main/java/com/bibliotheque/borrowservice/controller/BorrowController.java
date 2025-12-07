package com.bibliotheque.borrowservice.controller;

import com.bibliotheque.borrowservice.entity.Emprunt;
import com.bibliotheque.borrowservice.service.BorrowService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprunts")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping("/emprunter/{livreId}")
    public Emprunt emprunter(@PathVariable Long livreId, @RequestHeader("X-User-Id") Long userId) {
        return borrowService.emprunter(livreId, userId);
    }

    @PostMapping("/retour/{empruntId}")
    public Emprunt retourner(@PathVariable Long empruntId) {
        return borrowService.retourner(empruntId);
    }

    @GetMapping("/mes-emprunts")
    public List<Emprunt> mesEmprunts(@RequestHeader("X-User-Id") Long userId) {
        return borrowService.getEmpruntsByUser(userId);
    }

    @GetMapping("/retards")
    public List<Emprunt> getRetards() {
        return borrowService.getRetards();
    }
}