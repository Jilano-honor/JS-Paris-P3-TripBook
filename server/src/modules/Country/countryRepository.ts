import client from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Countries {
	id_country: number;
	name: string;
	flags: string;
}

const searchCountries = async (search: string) => {
	const query = `
    SELECT id_country, name
    FROM country
    WHERE name LIKE ?
    LIMIT 10;
`;

	const [rows] = await client.query<Rows>(query, [`%${search}%`]);

	return rows;
};

export default { searchCountries };
