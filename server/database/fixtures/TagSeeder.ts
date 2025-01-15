import AbstractSeeder from "./AbstractSeeder";
import ThemeSeeder from "./ThemeSeeder";

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
	static getAllTags() {
		throw new Error("Method not implemented.");
	}
	constructor() {
		super({ table: "tag", truncate: true, dependencies: [ThemeSeeder] });
	}

	run() {
		for (let i = 0; i < tags.length; i++) {
			const randomThemeId = Math.floor(Math.random() * 5);

			const fakeTag = {
				name: tags[i],
				photo: this.faker.image.urlPicsumPhotos(),
				refName: `tag_${i}`,
				theme_id: this.getRef(`theme_${randomThemeId}`).insertId,
			};
			this.insert(fakeTag);
		}
	}
}

export default TagSeeder;
