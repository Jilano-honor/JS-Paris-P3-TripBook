import AbstractSeeder from "./AbstractSeeder";

class CountrySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Country" });
  }

  async run() {
    const countryData = [
      {
        CountryName: "France",
        Description: "Un pays situé en Europe de l'Ouest.",
        Picture: Buffer.from(""), // Image binaire (exemple vide, remplacez avec une vraie image binaire)
      },
      {
        CountryName: "United States",
        Description: "Un pays d'Amérique du Nord.",
        Picture: Buffer.from(""), // Image binaire (exemple vide, remplacez avec une vraie image binaire)
      },
      // Ajoutez d'autres pays si nécessaire
    ];

    for (const data of countryData) {
      this.insert(data);
    }
  }
}

export default CountrySeeder;
