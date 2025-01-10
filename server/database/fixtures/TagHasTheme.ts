import AbstractSeeder from "./AbstractSeeder";

class TagHasThemeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Tag_has_Theme", truncate: true });
  }

  run() {
    const tagThemeAssociations = [
      {
        Tag_idTag: 1,
        Theme_idTheme: 1,
        Theme_IdTag: 1,
        Theme_Country_idCountry: 1,
      }, // Voyages en famille -> Aventure et Nature -> Népal
      {
        Tag_idTag: 2,
        Theme_idTheme: 2,
        Theme_IdTag: 2,
        Theme_Country_idCountry: 2,
      }, // Activités culturelles -> Aventure et Nature -> Costa Rica
      {
        Tag_idTag: 3,
        Theme_idTheme: 3,
        Theme_IdTag: 3,
        Theme_Country_idCountry: 3,
      }, // Cuisine mondiale -> Aventure et Nature -> Australie
      {
        Tag_idTag: 4,
        Theme_idTheme: 4,
        Theme_IdTag: 4,
        Theme_Country_idCountry: 4,
      }, // Voyages en train -> Aventure et Nature -> Chili
      {
        Tag_idTag: 5,
        Theme_idTheme: 5,
        Theme_IdTag: 5,
        Theme_Country_idCountry: 5,
      }, // Tourisme de luxe -> Aventure et Nature -> Tanzanie
      {
        Tag_idTag: 6,
        Theme_idTheme: 6,
        Theme_IdTag: 6,
        Theme_Country_idCountry: 6,
      }, // Villes modernes -> Aventure et Nature -> Grèce
      {
        Tag_idTag: 7,
        Theme_idTheme: 7,
        Theme_IdTag: 7,
        Theme_Country_idCountry: 7,
      }, // Sports d hiver -> Aventure et Nature -> Italie
      // Ajoutez d'autres associations de tags à des thèmes pour les autres pays
    ];

    // biome-ignore lint/complexity/noForEach: <explanation>
    tagThemeAssociations.forEach((association) => {
      this.insert(association); // insert into Tag_has_Theme(Tag_idTag, Theme_idTheme, Theme_IdTag, Theme_Country_idCountry) values (?, ?, ?, ?);
    });
  }
}

export default TagHasThemeSeeder;
