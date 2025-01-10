import AbstractSeeder from "./AbstractSeeder";

class TagSeeder extends AbstractSeeder {
  constructor() {
    // Appel au constructeur de la classe parente (AbstractSeeder) avec les options appropriées
    super({ table: "Tag", truncate: true });
  }

  // La méthode run - Remplir la table 'Tag' avec des données factices
  run() {
    const tags = [
      "Voyages en famille",
      "Activités culturelles",
      "Cuisine mondiale",
      "Voyages en train",
      "Tourisme de luxe",
      "Villes modernes",
      "Sports d hiver",
      "Sites naturels",
      "Voyages romantiques",
      "Îles exotiques",
      "Plages et détente",
      "Voyages en bateau et croisières",
      "Voyages culturels",
      "Sites UNESCO",
      "Villes historiques et culturelles",
      "Sites historiques et culturels",
      "Aventure en plein air",
      "Randonnée et trekking",
      "Tourisme durable",
      "Safari et faune",
      "Plongée et sports nautiques",
    ];

    // biome-ignore lint/complexity/noForEach: <explanation>
    tags.forEach((tagName) => {
      const fakeTag = {
        TagName: tagName,
      };
      this.insert(fakeTag); // insert into Tag(TagName) values (?);
    });
  }
}

export default TagSeeder;
