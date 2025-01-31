import { th } from "@faker-js/faker/.";
import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
	constructor() {
		super({ table: "user", truncate: true });
	}

	run() {
		for (let i = 0; i < 150; i += 1) {
			const fakeUser = {
				firstname: this.faker.person.firstName(),
				lastname: this.faker.person.lastName(),
				email: this.faker.internet.email(),
				password: this.faker.internet.password(),
				phone_number: this.faker.number.int(25),
				born_at: this.faker.date.birthdate(),
				avatar: this.faker.image.urlPicsumPhotos(),
				refName: `user_${i}`,
			};

			this.insert(fakeUser);
		}
	}
}

export default UserSeeder;
