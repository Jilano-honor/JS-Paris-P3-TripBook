import type { Request, RequestHandler, Response } from "express";
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
export default { browseCountries, read };
