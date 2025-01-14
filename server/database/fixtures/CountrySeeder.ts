import AbstractSeeder from "./AbstractSeeder";

class CountrySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Country", truncate: true });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeCountry = {
        Name: this.faker.location.country(),
        Flag: this.faker.location.countryCode(),
        refName: `country_${i}`,
      };

      this.insert(fakeCountry);
    }
  }
}

export default CountrySeeder;
