import { faker } from "@faker-js/faker";
import AbstractSeeder from "./AbstractSeeder";

class CountrySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Country", truncate: true });
  }

  run() {
    const numberOfCountries = 180;

    for (let i = 0; i < numberOfCountries; i++) {
      const fakeCountry = {
        CountryName: faker.address.country(),
        Description: faker.lorem.paragraph(),
        Picture: faker.image.avatar(),
      };

      this.insert(fakeCountry);
    }
  }
}

export default CountrySeeder;
