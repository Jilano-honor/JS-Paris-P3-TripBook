-- Seeder pour la table `User`
INSERT INTO `TripBook`.`User` (FirstName, LastName, Email, Password) VALUES
  ('Alice', 'Dupont', 'alice.dupont@example.com', 'password123'),
  ('Bob', 'Martin', 'bob.martin@example.com', 'password456'),
  ('Claire', 'Durand', 'claire.durand@example.com', 'password789'),
  ('David', 'Lemoine', 'david.lemoine@example.com', 'password101'),
  ('Emma', 'Benoit', 'emma.benoit@example.com', 'password102');

-- Seeder pour la table `Travel`
INSERT INTO `TripBook`.`Travel` (Title, Description, StartDate, EndDate, CountryId, UserId, IsArchived, User_idUser, Country_idCountry) VALUES
  ('Voyage en Népal', 'Un voyage aventureux au Népal pour découvrir les montagnes et la culture.', '2025-03-01 10:00:00', '2025-03-10 10:00:00', 1, 1, 0, 1, 1),
  ('Découverte de la Grèce', 'Plongée dans la culture grecque avec des visites de sites antiques.', '2025-06-01 10:00:00', '2025-06-14 10:00:00', 6, 2, 0, 2, 6),
  ('Séjour à Bali', 'Vacances tropicales sur l’île de Bali avec plage et détente.', '2025-07-01 10:00:00', '2025-07-15 10:00:00', 11, 3, 0, 3, 11),
  ('Voyage en Australie', 'Exploration de la faune et des sites naturels en Australie.', '2025-08-01 10:00:00', '2025-08-15 10:00:00', 3, 4, 0, 4, 3),
  ('Tour en Italie', 'Découverte des villes historiques et culturelles de l’Italie.', '2025-09-01 10:00:00', '2025-09-12 10:00:00', 7, 5, 0, 5, 7);

