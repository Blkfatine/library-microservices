package com.bibliotheque.bookservice.repository;

import com.bibliotheque.bookservice.entity.Auteur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuteurRepository extends JpaRepository<Auteur, Long> {
}