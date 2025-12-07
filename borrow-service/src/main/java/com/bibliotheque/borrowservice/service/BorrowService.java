package com.bibliotheque.borrowservice.service;

import com.bibliotheque.borrowservice.client.BookClient;
import com.bibliotheque.borrowservice.entity.Emprunt;
import com.bibliotheque.borrowservice.repository.EmpruntRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {

    private final EmpruntRepository empruntRepository;
    private final BookClient bookClient;
    private final JavaMailSender mailSender;

    public BorrowService(EmpruntRepository empruntRepository, BookClient bookClient, JavaMailSender mailSender) {
        this.empruntRepository = empruntRepository;
        this.bookClient = bookClient;
        this.mailSender = mailSender;
    }

    public Emprunt emprunter(Long livreId, Long userId) {
        Emprunt e = new Emprunt();
        e.setLivreId(livreId);
        e.setUserId(userId);
        bookClient.updateBook(livreId, new BookClient.BookUpdateRequest("EMPRUNTE"));
        return empruntRepository.save(e);
    }

    public Emprunt retourner(Long empruntId) {
        Emprunt e = empruntRepository.findById(empruntId).orElseThrow();
        e.setDateRetourEffective(LocalDate.now());
        bookClient.updateBook(e.getLivreId(), new BookClient.BookUpdateRequest("DISPONIBLE"));
        return empruntRepository.save(e);
    }

    public List<Emprunt> getEmpruntsByUser(Long userId) {
        return empruntRepository.findByUserId(userId);
    }

    public List<Emprunt> getRetards() {
        return empruntRepository.findByDateRetourEffectiveIsNullAndDateRetourPrevueBefore(LocalDate.now());
    }

    @Scheduled(cron = "0 0 9 * * *") // tous les jours à 9h
    public void envoyerNotificationsRetard() {
        List<Emprunt> retards = getRetards();
        for (Emprunt e : retards) {
            e.setRetard(true);
            empruntRepository.save(e);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("user" + e.getUserId() + "@biblio.com"); // à améliorer avec vrai email
            message.setSubject(" Retard de retour - Bibliothèque");
            message.setText("Bonjour,\n\nLe livre emprunté le " + e.getDateEmprunt() +
                    " aurait dû être rendu le " + e.getDateRetourPrevue() + ".\nMerci de le ramener rapidement !");
            mailSender.send(message);
        }
    }
}