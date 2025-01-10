import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "User", truncate: true });
  }

  run() {
    for (let i = 0; i < 50; i += 1) {
      const fakeUser = {
        FirstName: this.faker.name.firstName(),
        LastName: this.faker.name.lastName(),
        Email: this.faker.internet.email(),
        Password: this.faker.internet.password(),
      };

      this.insert(fakeUser);
    }
  }
}

export default UserSeeder;
