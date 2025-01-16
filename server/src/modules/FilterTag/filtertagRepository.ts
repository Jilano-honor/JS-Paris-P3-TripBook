import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type CountryTag = {
	country_id: number;
	tag_id: number;
};

class FilterTagRepository {
	async readAll() {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM country_tag",
		);
		return rows as CountryTag[];
	}

	async readByTags(tagId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM country JOIN country_tag ON country.id_country = country_tag.country_id WHERE tag_id = ?",
			[tagId],
		);
		return rows;
	}
}

export default new FilterTagRepository();
