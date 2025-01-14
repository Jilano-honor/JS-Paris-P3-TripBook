import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";
import TagSeeder from "./TagSeeder";

class CountryTagSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "CountryTag",
      truncate: true,
      dependencies: [TagSeeder, CountrySeeder],
    });
  }

  run() {
    for (let i = 0; i < 50; i++) {
      const randomTagId = Math.floor(Math.random() * 19);
      const countryTag = {
        CountryId: this.getRef(`country_${i}`).insertId,
        TagId: this.getRef(`tag_${randomTagId}`).insertId,
      };

      this.insert(countryTag);
    }
  }
}

export default CountryTagSeeder;
