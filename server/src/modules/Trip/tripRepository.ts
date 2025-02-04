import client from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import type Trip from "../../types/type";

const createTrip = (trip: Trip) => {
	return client.query<Result>(
		"INSERT INTO trip (id_trip,name,start_at,end_at,description,photo,user_id,country_id) VALUES (?,?,?,?,?,?,?,?)",
		[
			trip.id_trip,
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

const readTripbycountryId = async (country_id: number) => {
	return client.query<Rows>("SELECT * FROM trip WHERE country_id = ?;", [
		country_id,
	]);
};
export default { createTrip, readTripbycountryId };
