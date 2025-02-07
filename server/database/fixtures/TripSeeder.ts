import { faker } from "@faker-js/faker";
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
		for (let i = 0; i < 1000; i += 1) {
			const userId = faker.number.int({ min: 0, max: 99 });
			const countryId = faker.number.int({ min: 0, max: 199 });

			const fakeTrip = {
				name: faker.lorem.words(2),
				start_at: faker.date.anytime(),
				end_at: faker.date.anytime(),
				description: faker.lorem.text(),
				photo: faker.image.url(),
				user_id: this.getRef(`user_${userId}`).insertId,
				country_id: this.getRef(`country_${countryId}`).insertId,
			};

			this.insert(fakeTrip);
		}
	}
}

export default TripSeeder;
