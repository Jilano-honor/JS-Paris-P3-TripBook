import AbstractSeeder from "./AbstractSeeder";

class CountrySeeder extends AbstractSeeder {
  static getAllCountries() {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super({ table: "Country", truncate: true });
  }

  run() {
    const countryNames = new Set();

    for (let i = 0; i < 50; i += 1) {
      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let fakeCountryName;

      do {
        fakeCountryName = this.faker.location.country();
      } while (countryNames.has(fakeCountryName));

      countryNames.add(fakeCountryName);

      const fakeCountry = {
        Name: fakeCountryName,
        Flag: this.faker.location.countryCode(),
        refName: `country_${i}`,
      };

      this.insert(fakeCountry);
    }
  }
}

export default CountrySeeder;
