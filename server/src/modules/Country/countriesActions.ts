import type { NextFunction, Request, RequestHandler, Response } from "express";
import tripRepository from "../Trip/tripRepository";
import countryRepository from "./countryRepository";

const browseCountries = async (req: Request, res: Response) => {
	try {
		const name = req.query.name;

		if (typeof name !== "string" || name.trim() === "") {
			const countries = await countryRepository.readAll();

			res.status(200).json({ data: countries });
		} else {
			const countries = await countryRepository.readCountryByName(name);

			res.status(200).json({ data: countries });
		}
	} catch (error) {
		console.error("Error in searchCountries action:", error);
		res
			.status(500)
			.json({ error: "An error occurred while searching for countries." });
	}
};

const readCountriesById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const [countryId] = await countryRepository.readCountryById(Number(id));
		const [trip] = await tripRepository.readTripbycountryId(Number(id));
		countryId.trip = trip;
		if (countryId.length === 0) res.sendStatus(404);
		else res.json(countryId);
	} catch (error) {
		console.error("Erreur lors de la récupération du pays:", error);
		res.sendStatus(500);
	}
};

const read: RequestHandler = async (req, res, next) => {
	try {
		const tagId = Number(req.params.id);

		const filteredCountries = await countryRepository.readByTag(tagId);
		if (Number.isNaN(tagId)) {
			res.status(400).send("ID de tag invalide");
		}

		if (filteredCountries.length === 0) {
			res.sendStatus(404);
		} else {
			res.json(filteredCountries);
		}
	} catch (err) {
		next(err);
	}
};
const browsebytheme: RequestHandler = async (req, res, next) => {
	try {
		const themeId = Number(req.params.id);
		const countries = await countryRepository.readCountrybyTheme(themeId);
		res.json(countries);
	} catch (err) {
		next(err);
	}
};
export default { browseCountries, read, readCountriesById, browsebytheme };
