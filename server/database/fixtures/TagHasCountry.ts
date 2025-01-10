import AbstractSeeder from "./AbstractSeeder";

class TagHasCountrySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Tag_has_Country", truncate: true });
  }

  run() {
    const tagCountryAssociations = [
      { Tag_idTag: 1, Country_idCountry: 1 }, // Voyages en famille -> Népal
      { Tag_idTag: 2, Country_idCountry: 2 }, // Activités culturelles -> Costa Rica
      { Tag_idTag: 3, Country_idCountry: 3 }, // Cuisine mondiale -> Australie
      { Tag_idTag: 4, Country_idCountry: 4 }, // Voyages en train -> Chili
      { Tag_idTag: 5, Country_idCountry: 5 }, // Tourisme de luxe -> Tanzanie
      { Tag_idTag: 6, Country_idCountry: 6 }, // Villes modernes -> Grèce
      { Tag_idTag: 7, Country_idCountry: 7 }, // Sports d hiver -> Italie
      { Tag_idTag: 8, Country_idCountry: 8 }, // Sites naturels -> Inde
      { Tag_idTag: 9, Country_idCountry: 9 }, // Voyages romantiques -> Maroc
      { Tag_idTag: 10, Country_idCountry: 10 }, // Îles exotiques -> Maldives
      { Tag_idTag: 11, Country_idCountry: 11 }, // Plages et détente -> Bali (Indonésie)
      { Tag_idTag: 12, Country_idCountry: 12 }, // Voyages en bateau et croisières -> Fidji
      { Tag_idTag: 13, Country_idCountry: 13 }, // Voyages culturels -> Émirats Arabes Unis (Dubaï)
      { Tag_idTag: 14, Country_idCountry: 14 }, // Sites UNESCO -> Suisse
      { Tag_idTag: 15, Country_idCountry: 15 }, // Villes historiques et culturelles -> Singapour
      { Tag_idTag: 16, Country_idCountry: 16 }, // Sites historiques et culturels -> France
      { Tag_idTag: 17, Country_idCountry: 17 }, // Aventure en plein air -> Japon
      { Tag_idTag: 18, Country_idCountry: 18 }, // Randonnée et trekking -> Palestine
      { Tag_idTag: 19, Country_idCountry: 19 }, // Tourisme durable -> Canada
      { Tag_idTag: 20, Country_idCountry: 1 }, // Safari et faune -> Népal
      { Tag_idTag: 21, Country_idCountry: 2 }, // Plongée et sports nautiques -> Costa Rica
    ];

    // biome-ignore lint/complexity/noForEach: <explanation>
    tagCountryAssociations.forEach((association) => {
      this.insert(association); // insert into Tag_has_Country(Tag_idTag, Country_idCountry) values (?, ?);
    });
  }
}

export default TagHasCountrySeeder;
