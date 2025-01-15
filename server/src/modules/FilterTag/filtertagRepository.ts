import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type CountryTag = {
	country_id: number;
	tag_id: number;
};

class FilterTagRepository {
	// Récupère tous les pays associés aux tags
	async readAll() {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM country_tag",
		);
		return rows as CountryTag[];
	}

	// Filtre les pays par tags
	async readByTags(tagIds: number[]) {
		// Crée la requête SQL pour filtrer par tags sélectionnés
		const [rows] = await databaseClient.query<Rows>(
			"SELECT DISTINCT country_id FROM country_tag WHERE tag_id IN (?)",
			[tagIds],
		);
		return rows as { country_id: number }[];
	}
}

export default new FilterTagRepository();
