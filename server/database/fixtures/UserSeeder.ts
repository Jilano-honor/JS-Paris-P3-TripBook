import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Appel au constructeur de la classe parente (AbstractSeeder) avec les options appropriées
    super({ table: "User", truncate: true });
  }

  // La méthode run - Remplir la table 'User' avec des données factices
  run() {
    // Générer et insérer des données factices dans la table 'User'
    for (let i = 0; i < 50; i += 1) {
      // Générer des données factices pour un utilisateur
      const fakeUser = {
        FirstName: this.faker.name.firstName(), // Prénom généré par faker
        LastName: this.faker.name.lastName(), // Nom de famille généré par faker
        Email: this.faker.internet.email(), // Email généré par faker
        Password: this.faker.internet.password(), // Mot de passe généré par faker
      };

      // Insérer les données dans la table 'User'
      this.insert(fakeUser); // insert into User(FirstName, LastName, Email, Password) values (?, ?, ?, ?)
    }
  }
}

// Exporter la classe UserSeeder
export default UserSeeder;
