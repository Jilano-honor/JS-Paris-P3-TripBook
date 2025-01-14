import AbstractSeeder from "./AbstractSeeder";

const Themes = [
  "Aventure et Nature",
  "Culture et Histoire",
  "Plages et Détente",
  "Voyages de Luxe et Expériences Uniques",
  "Voyages en Famille et Activités Diverses",
];

class ThemeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Theme", truncate: true });
  }

  run() {
    for (let i = 0; i < Themes.length; i++) {
      const fakeTheme = {
        Name: Themes[i],
        Photo: this.faker.image.urlPicsumPhotos(),
        refName: `theme_${i}`,
      };
      this.insert(fakeTheme);
    }
  }
}

export default ThemeSeeder;
