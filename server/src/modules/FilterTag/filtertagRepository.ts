import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type CountryTag = {
	country_id: number;
	tag_id: number;
};

class FilterTagRepository {
	async readAll() {
		const [rows] = await databaseClient.query<Rows>("SELECT * FROM country");
		return rows as CountryTag[];
	}

	async readByTags(tagId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM country JOIN country_tag ON country.id_country = country_tag.country_id WHERE tag_id = ?",
			[tagId],
		);
		return rows;
	}
	async readTag(themeId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM tag WHERE theme_id = ?",
			[themeId],
		);
		return rows as CountryTag[];
	}
}

export default new FilterTagRepository();
