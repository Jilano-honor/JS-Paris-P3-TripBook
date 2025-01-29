import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ThemeRepository {
	async readTheme() {
		const [rows] = await databaseClient.query<Rows>("SELECT * FROM theme ");
		return rows;
	}
}

export default new ThemeRepository();
