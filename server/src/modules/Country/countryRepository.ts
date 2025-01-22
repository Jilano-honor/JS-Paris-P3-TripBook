import client from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Countries {
	id_country: number;
	name: string;
	flags: string;
}

const searchCountries = async (search: string) => {
	const query = `
    SELECT name
    FROM country
    WHERE name LIKE ?
    LIMIT 10;
`;

	// Effectuer la requête SQL en passant le paramètre de recherche
	const [rows] = await client.query<Rows>(query, [`%${search}%`]);

	// Retourner les résultats sous forme de tableau de pays
	return rows;
};

export default { searchCountries };
