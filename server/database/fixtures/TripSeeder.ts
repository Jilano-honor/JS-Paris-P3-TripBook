import { th } from "@faker-js/faker/.";
import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";
import UserSeeder from "./UserSeeder";

class TripSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "Trip",
      truncate: true,
      dependencies: [CountrySeeder, UserSeeder],
    });
  }

  run() {
    for (let i = 0; i < 50; i += 1) {
      const fakeTrip = {
        Name: this.faker.lorem.words(5),
        StartDate: this.faker.date.anytime(),
        EndDate: this.faker.date.anytime(),
        Description: this.faker.lorem.text(),
        Photo: this.faker.image.url(),
        User_IdUser: this.getRef(`user_${i}`).insertId,
        Country_idCountry: this.getRef(`country_${i}`).insertId,
      };

      this.insert(fakeTrip);
    }
  }
}

export default TripSeeder;
