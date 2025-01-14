import AbstractSeeder from "./AbstractSeeder";

const tags = [
  "Aventure en plein air",
  "Randonnée et trekking",
  "Sites naturels",
  "Tourisme durable",
  "Safari et faune",
  "Plongée et sports nautiques",
  "Voyages culturels",
  "Sites UNESCO",
  "Villes historiques et culturelles",
  "Cuisine mondiale",
  "Expériences locales et artisanat",
  "Îles exotiques",
  "Voyages en bateau et croisières",
  "Tourisme de luxe",
  "Sports d'hiver",
  "Villes modernes",
  "Voyages romantiques",
  "Voyages en famille",
  "Activités culturelles",
  "Voyages en train",
];

class TagSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "tag", truncate: true });
  }

  run() {
    for (let i = 0; i < tags.length; i++) {
      const fakeTag = {
        Name: tags[i],
      };
      this.insert(fakeTag);
    }
  }
}

export default TagSeeder;
