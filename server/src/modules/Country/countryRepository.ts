import client from "../../../database/client";
import type { Rows } from "../../../database/client";

interface Countries {
	id_country: number;
	name: string;
	flags: string;
}

interface Countrytag {
	country_id: number;
	tag_id: number;
}

const readCountryByName = async (search: string) => {
	const query = `
    SELECT id_country, name
    FROM country
    WHERE name LIKE ?
    LIMIT 2;
`;

	const [rows] = await client.query<Rows>(query, [`%${search}%`]);

	return rows;
};
const readAll = async () => {
	const query = "SELECT * FROM country ;";
	const [rows] = await client.query<Rows>(query);

	return rows;
};

const readCountryById = async (id_country: number) => {
	const [rows] = await client.query<Rows>(
		"SELECT country.id_country, country.name AS country_name, country.flag, tag.name AS tag_name, tag.photo AS tag_photo FROM country JOIN country_tag ON country.id_country = country_tag.country_id JOIN tag ON tag.id_tag = country_tag.tag_id WHERE id_country= ?;",
		[id_country],
	);
	return rows;
};
const readByTag = async (tagId: number) => {
	const query = `
		SELECT *
		FROM country
		JOIN country_tag ON country.id_country = country_tag.country_id
		WHERE tag_id = ?;
	`;
	const [rows] = await client.query<Rows>(query, [tagId]);
	return rows;
};
export default { readCountryByName, readAll, readByTag, readCountryById };
