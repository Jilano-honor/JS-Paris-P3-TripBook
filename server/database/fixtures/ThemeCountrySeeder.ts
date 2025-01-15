import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";
import ThemeSeeder from "./ThemeSeeder";

class ThemeCountrySeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "theme_country",
			truncate: true,
			dependencies: [ThemeSeeder, CountrySeeder],
		});
	}

	run() {
		for (let i = 0; i < 50; i++) {
			const randomThemeId = Math.floor(Math.random() * 5);
			const ThemeCountry = {
				theme_id: this.getRef(`theme_${randomThemeId}`).insertId,
				country_id: this.getRef(`country_${i}`).insertId,
			};

			this.insert(ThemeCountry);
		}
	}
}

export default ThemeCountrySeeder;
