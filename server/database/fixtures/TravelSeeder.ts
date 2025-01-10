import AbstractSeeder from "./AbstractSeeder";
import CountrySeeder from "./CountrySeeder";
import UserSeeder from "./UserSeeder";

class TravelSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Travel", dependencies: [UserSeeder, CountrySeeder] });
  }

  async run() {
    const travelData = [
      {
        Title: "Vacances à Paris",
        Description: "Un voyage fantastique à la découverte de Paris.",
        StartDate: this.faker.date.future(),
        EndDate: this.faker.date.future(),
        CountryId: 1, // ID du pays France
        UserId: 1, // ID de l'utilisateur
        IsArchived: 0,
      },
      {
        Title: "Road trip aux États-Unis",
        Description: "Un voyage en voiture à travers les États-Unis.",
        StartDate: this.faker.date.future(),
        EndDate: this.faker.date.future(),
        CountryId: 2, // ID du pays États-Unis
        UserId: 2, // ID de l'utilisateur
        IsArchived: 0,
      },
      // Ajoutez d'autres voyages si nécessaire
    ];

    for (const data of travelData) {
      this.insert(data);
    }
  }
}

export default TravelSeeder;
