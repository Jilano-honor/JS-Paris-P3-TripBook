import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";

class TagHasCountrySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Tag_has_Country", dependencies: [CountrySeeder] });
  }

  async run() {
    const tagHasCountryData = [
      { Tag_idTag: 1, Country_idCountry: 1 }, // Exemple d'association (ajustez selon votre logique de tags)
      { Tag_idTag: 2, Country_idCountry: 2 }, // Exemple d'association (ajustez selon votre logique de tags)
      // Ajoutez d'autres associations si nécessaire
    ];

    for (const data of tagHasCountryData) {
      this.insert(data);
    }
  }
}

export default TagHasCountrySeeder;
