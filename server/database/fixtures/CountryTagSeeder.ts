import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";
import TagSeeder from "./TagSeeder";

class CountryTagSeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "country_tag",
			truncate: true,
			dependencies: [TagSeeder, CountrySeeder],
		});
	}

	run() {
		for (let i = 0; i < 150; i++) {
			const randomTagId = Math.floor(Math.random() * 19);
			const countryTag = {
				country_id: this.getRef(`country_${i}`).insertId,
				tag_id: this.getRef(`tag_${randomTagId}`).insertId,
			};

			this.insert(countryTag);
		}
	}
}

export default CountryTagSeeder;
