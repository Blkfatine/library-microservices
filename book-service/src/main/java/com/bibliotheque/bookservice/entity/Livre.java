package com.bibliotheque.bookservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "livres")
@Data @NoArgsConstructor @AllArgsConstructor
public class Livre {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    private String genre;
    private String description;
    private Integer annee;
    private String isbn;

    @Enumerated(EnumType.STRING)
    private StatutLivre statut = StatutLivre.DISPONIBLE;

    @ManyToOne
    @JoinColumn(name = "auteur_id")
    private Auteur auteur;

    public enum StatutLivre {
        DISPONIBLE, EMPRUNTE, PERDU
    }
}