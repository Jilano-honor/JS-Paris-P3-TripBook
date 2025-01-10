import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "User", truncate: true });
  }

  async run() {
    const userData = [];

    for (let i = 0; i < 50; i++) {
      userData.push({
        FirstName: this.faker.person.firstName(),
        LastName: this.faker.person.lastName(),
        Email: this.faker.internet.email(),
        Password: this.faker.internet.password(),
        refName: `user_${i}`,
      });
    }

    for (const data of userData) {
      this.insert(data);
    }
  }
}

export default UserSeeder;
