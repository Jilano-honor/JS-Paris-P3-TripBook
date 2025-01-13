import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class TripSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "Trip",
      truncate: true,
      dependencies: [UserSeeder],
    });
  }

  async run() {
    const CountryData = [];
    const maxCountries = 180;

    for (let i = 0; i < maxCountries; i++) {
      CountryData.push({
        CountryName: this.faker.location.country(),
        Description: this.faker.lorem.text(),
        Picture: this.faker.image.urlPicsumPhotos(),
      });
    }

    for (const data of CountryData) {
      this.insert(data);
    }
  }
}

export default TripSeeder;
