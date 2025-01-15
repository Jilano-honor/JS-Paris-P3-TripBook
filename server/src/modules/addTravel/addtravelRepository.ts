import client from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Trip {
	name: string;
	start_date: Date;
	end_date: Date;
	description: string;
	photo: string;
	user_id: number;
	country_id: number;
}

const createTrip = (trip: Trip) => {
	return client.query<Result>(
		"INSERT INTO trip (name,start_date,end_date,description,photo,user_id,country_id) VALUES (?,?,?,?,?,?,?)",
		[
			trip.name,
			trip.start_date,
			trip.end_date,
			trip.description,
			trip.photo,
			trip.user_id,
			trip.country_id,
		],
	);
};
export default { createTrip };
