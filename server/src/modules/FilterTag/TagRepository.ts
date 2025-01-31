import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

import type CountryTag from "../../types/typeCountryTag";

class TagRepository {
	async readByTheme(themeId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM tag WHERE theme_id = ?",
			[themeId],
		);
		return rows as CountryTag[];
	}
}

export default new TagRepository();
