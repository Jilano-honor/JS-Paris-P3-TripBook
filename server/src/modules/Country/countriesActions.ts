import type { Request, Response } from "express";
import CountryRepository from "./countryRepository";

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

export default { browseCountries };
