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
    private String image_url;

    @Enumerated(EnumType.STRING)
    private StatutLivre statut = StatutLivre.DISPONIBLE;

    @ManyToOne
    @JoinColumn(name = "auteur_id")
    private Auteur auteur;

    public enum StatutLivre {
        DISPONIBLE, EMPRUNTE, PERDU
    }

    // Manual Getters/Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getAnnee() { return annee; }
    public void setAnnee(Integer annee) { this.annee = annee; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public String getImage_url() { return image_url; }
    public void setImage_url(String image_url) { this.image_url = image_url; }
    public StatutLivre getStatut() { return statut; }
    public void setStatut(StatutLivre statut) { this.statut = statut; }
    public Auteur getAuteur() { return auteur; }
    public void setAuteur(Auteur auteur) { this.auteur = auteur; }
}