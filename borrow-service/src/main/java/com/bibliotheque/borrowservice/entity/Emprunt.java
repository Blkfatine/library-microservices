package com.bibliotheque.borrowservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "emprunts")
@Data @NoArgsConstructor @AllArgsConstructor
public class Emprunt {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long livreId;

    private LocalDate dateEmprunt = LocalDate.now();
    private LocalDate dateRetourPrevue = LocalDate.now().plusDays(14);
    private LocalDate dateRetourEffective;

    private boolean retard = false;
}