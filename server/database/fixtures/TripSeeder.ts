import { th } from "@faker-js/faker/.";
import AbstractSeeder from "./AbstractSeeder";

class TripSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Trip", truncate: true, dependencies: [] });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeTrip = {
        Name: this.faker.lorem.words(5),
        StartDate: this.faker.date.anytime(),
        EndDate: this.faker.date.anytime(),
        Description: this.faker.lorem.text(),
        Photo: this.faker.image.url(),
      };

      this.insert(fakeTrip);
    }
  }
}

export default TripSeeder;
