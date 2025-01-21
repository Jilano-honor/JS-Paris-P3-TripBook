import client from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Country {
	id_country: number;
	name: string;
	flags: string;
}

const readAll = async (country: Country) => {
	const [rows] = await client.query<Rows>(
		"SELECT code, name FROM countries WHERE name LIKE ?LIMIT 10;",
		[country.name],
	);
	return rows;
};

export default { readAll };
