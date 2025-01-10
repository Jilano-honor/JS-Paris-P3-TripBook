import AbstractSeeder from "./AbstractSeeder";

class TravelSeeder extends AbstractSeeder {
  constructor() {
    // Appel au constructeur de la classe parente (AbstractSeeder) avec les options appropriées
    super({ table: "Travel", truncate: true });
  }

  // La méthode run - Remplir la table 'Travel' avec des données factices
  run() {
    // Générer et insérer des données factices dans la table 'Travel'
    for (let i = 0; i < 10; i += 1) {
      // Générer des données factices pour un voyage
      const fakeTravel = {
        Title: this.faker.lorem.words(3), // Titre du voyage avec 3 mots aléatoires
        Description: this.faker.lorem.sentences(3), // Description avec 3 phrases aléatoires
        StartDate: this.faker.date.future(), // Date de début du voyage (dans le futur)
        EndDate: this.faker.date.future(), // Date de fin du voyage (dans le futur)
        CountryId: this.faker.number.int({ min: 1, max: 20 }), // Id d'un pays aléatoire entre 1 et 20
        UserId: this.faker.number.int({ min: 1, max: 5 }), // Id d'un utilisateur aléatoire entre 1 et 5
        IsArchived: this.faker.datatype.boolean(), // Si le voyage est archivé ou non
        User_idUser: this.faker.number.int({ min: 1, max: 5 }), // Id de l'utilisateur
        Country_idCountry: this.faker.number.int({ min: 1, max: 20 }), // Id du pays
      };

      // Insérer les données dans la table 'Travel'
      this.insert(fakeTravel); // insert into Travel(Title, Description, StartDate, EndDate, CountryId, UserId, IsArchived, User_idUser, Country_idCountry) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
    }
  }
}

// Exporter la classe TravelSeeder
export default TravelSeeder;
