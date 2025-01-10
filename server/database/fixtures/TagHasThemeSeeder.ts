import AbstractSeeder from "./AbstractSeeder";

interface Theme {
  id: number;
  name: string;
}

class TagHasThemeSeeder extends AbstractSeeder {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  query!: (queryString: string) => Promise<any>;

  constructor() {
    super({ table: "Tag_has_Theme", truncate: true });
  }

  async run() {
    try {
      const themes = await this.getAllThemes();
      const tags = this.getTags();

      const themeAssociations = this.createThemeAssociations(tags, themes);

      await this.bulkInsert(themeAssociations);
    } catch (error) {
      console.error("Error during seeding:", error);
    }
  }

  async getAllThemes(): Promise<Theme[]> {
    return await this.query("SELECT * FROM Theme");
  }

  getTags(): string[] {
    return [
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
  }

  createThemeAssociations(
    tags: string[],
    themes: Theme[],
  ): { Tag_idTag: number; Theme_idTheme: number }[] {
    const themeMap = this.createThemeMap(themes);

    return tags.reduce<{ Tag_idTag: number; Theme_idTheme: number }[]>(
      (acc, tag, index) => {
        const associatedThemes = this.getThemesForTag(tag, themeMap);
        const newAssociations = associatedThemes.map((theme) => ({
          Tag_idTag: index + 1,
          Theme_idTheme: theme.id,
        }));
        return acc.concat(newAssociations);
      },
      [],
    );
  }

  createThemeMap(themes: Theme[]): Record<string, Theme[]> {
    return themes.reduce(
      (map, theme) => {
        if (!map[theme.name]) {
          map[theme.name] = [];
        }
        map[theme.name].push(theme);
        return map;
      },
      {} as Record<string, Theme[]>,
    );
  }

  getThemesForTag(tag: string, themeMap: Record<string, Theme[]>): Theme[] {
    const tagToThemeMap: Record<string, string[]> = {
      "Voyages en famille": ["Voyages en Famille et Activités Diverses"],
      "Voyages culturels": ["Voyages en Famille et Activités Diverses"],
      "Voyages en train": ["Voyages en Famille et Activités Diverses"],
      "Voyages romantiques": ["Voyages en Famille et Activités Diverses"],
      "Activités culturelles": ["Culture et Histoire"],
      "Villes historiques et culturelles": ["Culture et Histoire"],
      "Sites UNESCO": ["Culture et Histoire"],
      "Cuisine mondiale": ["Voyages de Luxe et Expériences Uniques"],
      "Villes modernes": ["Voyages de Luxe et Expériences Uniques"],
      "Tourisme de luxe": ["Voyages de Luxe et Expériences Uniques"],
      "Plages et détente": ["Plages et Détente"],
      "Îles exotiques": ["Plages et Détente"],
      "Sports d hiver": ["Aventure et Nature"],
      "Safari et faune": ["Aventure et Nature"],
      "Sites naturels": ["Aventure et Nature"],
      "Plongée et sports nautiques": ["Aventure et Nature"],
      "Voyages en bateau et croisières": ["Aventure et Nature"],
      "Aventure en plein air": ["Aventure et Nature"],
      "Randonnée et trekking": ["Aventure et Nature"],
      "Tourisme durable": ["Aventure et Nature"],
    };

    const themeNames = tagToThemeMap[tag] || [];
    return themeNames.flatMap((name) => themeMap[name] || []);
  }

  async bulkInsert(
    associations: { Tag_idTag: number; Theme_idTheme: number }[],
  ) {
    const chunkSize = 100;
    try {
      for (let i = 0; i < associations.length; i += chunkSize) {
        const chunk = associations.slice(i, i + chunkSize);
        await this.insert(chunk);
      }
    } catch (error) {
      console.error("Error during bulk insert:", error);
    }
  }
}

export default TagHasThemeSeeder;
