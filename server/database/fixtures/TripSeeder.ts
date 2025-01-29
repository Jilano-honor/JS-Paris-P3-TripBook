import { th } from "@faker-js/faker/.";
import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";
import UserSeeder from "./UserSeeder";

class TripSeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "trip",
			truncate: true,
			dependencies: [CountrySeeder, UserSeeder],
		});
	}

	run() {
		for (let i = 0; i < 50; i += 1) {
			const fakeTrip = {
				name: this.faker.lorem.words(2),
				start_at: this.faker.date.anytime(),
				end_at: this.faker.date.anytime(),
				description: this.faker.lorem.text(),
				photo: this.faker.image.url(),
				user_id: this.getRef(`user_${i}`).insertId,
				country_id: this.getRef(`country_${i}`).insertId,
			};

			this.insert(fakeTrip);
		}
	}
}

export default TripSeeder;
