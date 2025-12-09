package com.bibliotheque.bookservice.repository;

import com.bibliotheque.bookservice.entity.Avis;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvisRepository extends JpaRepository<Avis, Long> {
    List<Avis> findByLivreId(Long livreId);
}
