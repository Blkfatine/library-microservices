package com.bibliotheque.borrowservice.repository;

import com.bibliotheque.borrowservice.entity.Emprunt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {
    List<Emprunt> findByUserId(Long userId);
    List<Emprunt> findByDateRetourEffectiveIsNullAndDateRetourPrevueBefore(LocalDate date);
}