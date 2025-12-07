package com.bibliotheque.bookservice.service;

import com.bibliotheque.bookservice.entity.Auteur;
import com.bibliotheque.bookservice.entity.Livre;
import com.bibliotheque.bookservice.repository.AuteurRepository;
import com.bibliotheque.bookservice.repository.LivreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final LivreRepository livreRepository;
    private final AuteurRepository auteurRepository;

    public BookService(LivreRepository livreRepository, AuteurRepository auteurRepository) {
        this.livreRepository = livreRepository;
        this.auteurRepository = auteurRepository;
    }

    public List<Livre> getAllLivres() { return livreRepository.findAll(); }
    public Livre getLivreById(Long id) { return livreRepository.findById(id).orElseThrow(); }
    public Livre saveLivre(Livre livre) { return livreRepository.save(livre); }
    public Livre updateLivre(Long id, Livre livre) {
        livre.setId(id);
        return livreRepository.save(livre);
    }
    public void deleteLivre(Long id) { livreRepository.deleteById(id); }

    public List<Auteur> getAllAuteurs() { return auteurRepository.findAll(); }
    public Auteur saveAuteur(Auteur auteur) { return auteurRepository.save(auteur); }

    public List<Livre> search(String titre, String genre) {
        if (titre != null) return livreRepository.findByTitreContainingIgnoreCase(titre);
        if (genre != null) return livreRepository.findByGenreContainingIgnoreCase(genre);
        return livreRepository.findAll();
    }

    public List<Livre> getRecommandations() {
        return livreRepository.findTop10ByOrderByIdDesc(); // les 10 derniers ajoutés
    }
}