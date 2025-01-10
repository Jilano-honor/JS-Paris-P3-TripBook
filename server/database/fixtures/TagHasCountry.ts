import AbstractSeeder from "./AbstractSeeder";

class TagHasCountrySeeder extends AbstractSeeder {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [x: string]: any;

  constructor() {
    super({ table: "Tag_has_Country", truncate: true });
  }

  async run() {
    const countries = await this.getAllCountries();
    const numberOfTags = 21;
    const tagCountryAssociations = [];

    const shuffledCountries = this.shuffleArray(countries);

    for (let tagId = 1; tagId <= numberOfTags; tagId++) {
      const randomCountry = shuffledCountries.pop();

      if (randomCountry) {
        tagCountryAssociations.push({
          Tag_idTag: tagId,
          Country_idCountry: randomCountry.id,
        });
      }
    }

    for (const association of tagCountryAssociations) {
      await this.insert(association);
    }
  }

  async getAllCountries() {
    return await this.query("SELECT * FROM Country");
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

export default TagHasCountrySeeder;
