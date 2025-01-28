import type { NextFunction, Request, RequestHandler, Response } from "express";
import CountryRepository from "./countryRepository";
import countryRepository from "./countryRepository";

const browseCountries = async (req: Request, res: Response) => {
	try {
		const name = req.query.name;

		if (typeof name !== "string" || name.trim() === "") {
			const countries = await CountryRepository.readAll();

			res.status(200).json({ data: countries });
		} else {
			const countries = await CountryRepository.readCountryByName(name);

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
		if (countryId.length === 0) res.sendStatus(404);
		else res.json(countryId);
	} catch (error) {
		console.error("Erreur lors de la récupération du pays:", error);
		res.sendStatus(500);
	}
};

export default { browseCountries, readCountriesById };
