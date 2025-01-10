import AbstractSeeder from "./AbstractSeeder";

class TravelSeeder extends AbstractSeeder {
  constructor() {
    // Appel au constructeur de la classe parente (AbstractSeeder) avec les options appropriées
    super({ table: "Travel", truncate: true });
  }

  // La méthode run - Remplir la table 'Travel' avec des données factices
  run() {
    // Générer et insérer des données factices dans la table 'Travel'
    for (let i = 0; i < 500; i += 1) {
      // Générer des données factices pour un voyage
      const startDate = this.faker.date.future(); // Date de début du voyage (dans le futur)

      // Ajouter un nombre aléatoire de jours (par exemple entre 1 et 30 jours) à la startDate
      const endDate = new Date(
        startDate.getTime() +
          this.faker.number.int({ min: 1, max: 30 }) * 24 * 60 * 60 * 1000,
      );

      const fakeTravel = {
        Title: this.faker.lorem.words(3), // Titre du voyage avec 3 mots aléatoires
        Description: this.faker.lorem.sentences(3), // Description avec 3 phrases aléatoires
        StartDate: startDate, // Date de début du voyage
        EndDate: endDate, // Date de fin du voyage
        CountryId: this.faker.number.int({ min: 1, max: 180 }), // Id d'un pays aléatoire entre 1 et 180
        UserId: this.faker.number.int({ min: 1, max: 50 }), // Id d'un utilisateur aléatoire entre 1 et 50
        IsArchived: this.faker.datatype.boolean(), // Si le voyage est archivé ou non
      };

      // Insérer les données dans la table 'Travel'
      this.insert(fakeTravel); // insert into Travel(Title, Description, StartDate, EndDate, CountryId, UserId, IsArchived) values (?, ?, ?, ?, ?, ?, ?)
    }
  }
}

// Exporter la classe TravelSeeder
export default TravelSeeder;
