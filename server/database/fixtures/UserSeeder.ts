import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "User", truncate: true });
  }

  run() {
    for (let i = 0; i < 50; i += 1) {
      const fakeUser = {
        FirstName: this.faker.person.firstName(),
        LastName: this.faker.person.lastName(),
        Email: this.faker.internet.email(),
        Number: this.faker.phone.number(),
        Password: this.faker.internet.password(),
      };

      this.insert(fakeUser);
    }
  }
}

export default UserSeeder;
