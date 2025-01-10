import { faker } from "@faker-js/faker";
import AbstractSeeder from "./AbstractSeeder";

class CountrySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Country", truncate: true });
  }

  run() {
    const numberOfCountries = 180; // Nombre de pays à générer

    for (let i = 0; i < numberOfCountries; i++) {
      // Générer un pays avec des informations aléatoires
      const fakeCountry = {
        CountryName: faker.address.country(), // Nom du pays généré aléatoirement
        Description: faker.lorem.paragraph(), // Description générée aléatoirement
        Picture: faker.image.avatar(), // URL d'image aléatoire (ou vous pouvez utiliser des noms d'images spécifiques)
      };

      // Insérer le pays généré dans la base de données
      this.insert(fakeCountry); // insert into Country(CountryName, Description, Picture) values (?, ?, ?);
    }
  }
}

export default CountrySeeder;
