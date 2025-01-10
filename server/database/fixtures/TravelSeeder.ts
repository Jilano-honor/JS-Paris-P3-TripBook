import AbstractSeeder from "./AbstractSeeder";

class TravelSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Travel", truncate: true });
  }

  run() {
    for (let i = 0; i < 500; i += 1) {
      const startDate = this.faker.date.future();

      const endDate = new Date(
        startDate.getTime() +
          this.faker.number.int({ min: 1, max: 30 }) * 24 * 60 * 60 * 1000,
      );

      const fakeTravel = {
        Title: this.faker.lorem.words(3),
        Description: this.faker.lorem.sentences(3),
        StartDate: startDate,
        EndDate: endDate,
        CountryId: this.faker.number.int({ min: 1, max: 180 }),
        UserId: this.faker.number.int({ min: 1, max: 50 }),
        IsArchived: this.faker.datatype.boolean(),
      };

      this.insert(fakeTravel);
    }
  }
}

export default TravelSeeder;
