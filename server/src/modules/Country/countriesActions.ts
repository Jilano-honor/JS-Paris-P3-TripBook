import type { Request, Response } from "express";
import CountryRepository from "./CountryRepository";

const searchbarCountries = async (req: Request, res: Response) => {
	try {
		const { search } = req.body;

		if (typeof search !== "string" || search.trim() === "") {
			res.status(400).json({
				error: "Search query is required and must be a non-empty string.",
			});
			return;
		}

		const countries = await CountryRepository.searchCountries(search);

		res.status(200).json({ data: countries });
	} catch (error) {
		console.error("Error in searchCountries action:", error);
		res
			.status(500)
			.json({ error: "An error occurred while searching for countries." });
	}
};

export default { searchbarCountries };
