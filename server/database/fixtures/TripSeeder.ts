import { faker } from "@faker-js/faker";
import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class TripSeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "trip",
			truncate: true,
			dependencies: [UserSeeder],
		});
	}

	run() {
		for (let i = 0; i < 1000; i += 1) {
			const userId = faker.number.int({ min: 0, max: 99 });

			const fakeTrip = {
				name: faker.lorem.words(2),
				start_at: faker.date.anytime(),
				end_at: faker.date.anytime(),
				description: faker.lorem.text(),
				photo: faker.image.url(),
				user_id: this.getRef(`user_${userId}`).insertId,
				country_id: faker.number.int({ min: 1, max: 239 }),
			};

			this.insert(fakeTrip);
		}
	}
}

export default TripSeeder;
