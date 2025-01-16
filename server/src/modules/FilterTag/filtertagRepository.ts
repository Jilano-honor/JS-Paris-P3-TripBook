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

	async readByTags(tagIds: number[]) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM country_tag",
		);
		return rows as { country_id: number }[];
	}
}

export default new FilterTagRepository();
