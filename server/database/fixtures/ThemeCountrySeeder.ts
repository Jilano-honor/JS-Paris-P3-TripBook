import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";
import ThemeSeeder from "./ThemeSeeder";

class ThemeCountrySeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "ThemeCountry",
      truncate: true,
      dependencies: [ThemeSeeder, CountrySeeder],
    });
  }

  run() {
    for (let i = 0; i < 50; i++) {
      const randomThemeId = Math.floor(Math.random() * 5);
      const ThemeCountry = {
        CountryId: this.getRef(`country_${i}`).insertId,
        ThemeId: this.getRef(`theme_${randomThemeId}`).insertId,
      };

      this.insert(ThemeCountry);
    }
  }
}

export default ThemeCountrySeeder;
