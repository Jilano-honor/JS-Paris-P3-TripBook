import client from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import type Trip from "../../types/type";
import type CountryTag from "../../types/typeCountryTag";

const createTrip = (trip: Trip) => {
	return client.query<Result>(
		"INSERT INTO trip (name,start_at,end_at,description,photo,user_id,country_id) VALUES (?,?,?,?,?,?,?)",
		[
			trip.name,
			trip.start_at,
			trip.end_at,
			trip.description,
			trip.photo,
			trip.user_id,
			trip.country_id,
		],
	);
};
const readAll = async () => {
	const [rows] = await client.query<Rows>("SELECT * FROM country");
	return rows as CountryTag[];
};

export default { createTrip, readAll };
