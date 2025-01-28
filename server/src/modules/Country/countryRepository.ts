import client from "../../../database/client";
import type { Rows } from "../../../database/client";

interface Countries {
	id_country: number;
	name: string;
	flags: string;
}

const readCountryByName = async (search: string) => {
	const query = `
    SELECT id_country, name
    FROM country
    WHERE name LIKE ?
    LIMIT 10;
`;

	const [rows] = await client.query<Rows>(query, [`%${search}%`]);

	return rows;
};
const readAll = async () => {
	const query = "SELECT * FROM country ;";
	const [rows] = await client.query<Rows>(query);

	return rows;
};
export default { readCountryByName, readAll };
