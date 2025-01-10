import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "User" });
  }

  async run() {
    const userData = [
      {
        FirstName: this.faker.name.firstName(),
        LastName: this.faker.name.lastName(),
        Email: this.faker.internet.email(),
        Password: this.faker.internet.password(),
        Number: this.faker.phone.number(),
      },
      // Ajoutez d'autres utilisateurs si nécessaire
    ];

    for (const data of userData) {
      this.insert(data);
    }
  }
}

export default UserSeeder;
