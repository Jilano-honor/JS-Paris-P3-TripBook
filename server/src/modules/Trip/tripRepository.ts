import { RouterProvider } from "react-router-dom";
import type Trip from "../../../../client/src/types/type";
import type CountryTag from "../../../../client/src/types/typeCountryTag";
import client from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

const createTrip = (trip: Trip) => {
	return client.query<Result>(
		"INSERT INTO trip (id_trip,name,start_at,end_at,description,photo,user_id,country_id) VALUES (?,?,?,?,?,?,?)",
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

const readTripbycountryId = async (country_id: number) => {
	return client.query<Rows>("SELECT * FROM trip WHERE country_id = ?;", [
		country_id,
	]);
};
const readTrips = async (country_id: number) => {
	const [rows] = await client.query<Rows>(
		"SELECT * FROM trip WHERE country_id = ?;",
		[country_id],
	);
	return rows;
};

const readTrip = (idTrip: number) => {
	return client.query<Rows>(
		"SELECT t.name as tripName, c.name as countryName, c.flag, t.* FROM trip as t join country as c on c.id_country = t.country_id WHERE id_trip= ?;",
		[idTrip],
	);
};
const readAll = async (themeId: number) => {
	const [rows] = await client.query<Rows>(
		`
        SELECT *
        FROM country
        JOIN theme_country ON country.id_country = theme_country.country_id
        WHERE theme_id = ?;
        `,
		[themeId],
	);
	return rows as CountryTag[];
};
export default {
	createTrip,
	readTrips,
	readTrip,
	readAll,
	readTripbycountryId,
};
