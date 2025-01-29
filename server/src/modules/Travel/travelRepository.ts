import client from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import type Trip from "../../types/type";

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

const readTrips = (countryId: number) => {
	return client.query<Rows>("SELECT * FROM trip WHERE country_id = ?", [
		countryId,
	]);
};
const readTrip = (idTrip: number) => {
	return client.query<Rows>("SELECT * FROM trip WHERE id_trip = ?", [idTrip]);
};
export default { createTrip, readTrips, readTrip };
