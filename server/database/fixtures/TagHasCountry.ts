import AbstractSeeder from "./AbstractSeeder";

class TagHasCountrySeeder extends AbstractSeeder {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [x: string]: any;
  constructor() {
    super({ table: "Tag_has_Country", truncate: true });
  }

  async run() {
    // Récupérer tous les pays générés par le seeder précédent
    const countries = await this.getAllCountries(); // Méthode pour récupérer tous les pays

    const numberOfTags = 21; // Nombre de tags
    const tagCountryAssociations = [];

    // Mélanger aléatoirement les pays
    const shuffledCountries = this.shuffleArray(countries);

    // Associer chaque tag à un pays aléatoire
    for (let tagId = 1; tagId <= numberOfTags; tagId++) {
      // Choisir un pays au hasard (tiré de la liste des pays mélangés)
      const randomCountry = shuffledCountries.pop(); // Récupérer le dernier pays mélangé (ou utiliser un autre mécanisme pour un choix aléatoire)

      // Vérifier si un pays existe encore pour l'association
      if (randomCountry) {
        tagCountryAssociations.push({
          Tag_idTag: tagId, // Associer un tag par ID
          Country_idCountry: randomCountry.id, // Associer le pays par ID
        });
      }
    }

    // Insérer toutes les associations dans la base de données
    for (const association of tagCountryAssociations) {
      await this.insert(association); // Insertion dans Tag_has_Country
    }
  }

  // Méthode pour récupérer tous les pays depuis la base de données
  async getAllCountries() {
    return await this.query("SELECT * FROM Country"); // Requête pour récupérer tous les pays
  }

  // Fonction pour mélanger les pays de manière aléatoire (Fisher-Yates shuffle)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
    }
    return array;
  }
}

export default TagHasCountrySeeder;
