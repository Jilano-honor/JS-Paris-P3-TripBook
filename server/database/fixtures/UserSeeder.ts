import { th } from "@faker-js/faker/.";
import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    for (let i = 0; i < 50; i += 1) {
      const fakeUser = {
        FirstName: this.faker.person.firstName(),
        LastName: this.faker.person.lastName(),
        Email: this.faker.internet.email(),
        Password: this.faker.internet.password(),
        PhoneNumber: this.faker.number.int(25),
        DateOfBirth: this.faker.date.birthdate(),
        Avatar: this.faker.image.urlPicsumPhotos(),
        refName: `user_${i}`,
      };

      this.insert(fakeUser);
    }
  }
}

export default UserSeeder;
