-- Ajout des colonnes pour la Phase 1
ALTER TABLE livres ADD COLUMN image_url VARCHAR(255);
ALTER TABLE livres ADD COLUMN note_moyenne DOUBLE DEFAULT 0.0;
ALTER TABLE livres ADD COLUMN langue VARCHAR(50);
ALTER TABLE livres ADD COLUMN editeur VARCHAR(100);
ALTER TABLE livres ADD COLUMN nombre_exemplaires INT DEFAULT 1;
ALTER TABLE livres ADD COLUMN date_publication DATE;

-- Création de la table des avis
CREATE TABLE IF NOT EXISTS avis (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    livre_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    note INT NOT NULL,
    commentaire VARCHAR(1000),
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Données de test (Optionnel)
UPDATE livres SET image_url = 'https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg', note_moyenne = 4.5, langue = 'Français', editeur = 'Gallimard', nombre_exemplaires = 5 WHERE id = 1;
UPDATE livres SET image_url = 'https://m.media-amazon.com/images/I/71K1tWl3wRL._AC_UF1000,1000_QL80_.jpg', note_moyenne = 4.8, langue = 'Anglais', editeur = 'Penguin', nombre_exemplaires = 3 WHERE id = 2;
