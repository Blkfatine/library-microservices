package com.bibliotheque.bookservice.repository;

import com.bibliotheque.bookservice.entity.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {
    List<Livre> findByTitreContainingIgnoreCase(String titre);
    List<Livre> findByGenreContainingIgnoreCase(String genre);
    List<Livre> findTop10ByOrderByIdDesc();
}