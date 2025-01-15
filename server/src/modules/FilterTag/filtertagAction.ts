import type { RequestHandler } from "express";
import filtertagRepository from "./filtertagRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const filteredCountry = await filtertagRepository.readAll();
		res.json(filteredCountry);
	} catch (err) {
		next(err);
	}
};

const read: RequestHandler = async (req, res, next) => {
	try {
		const countryId = Number(req.params.country_id);
		const tagIds = req.params.tag_ids.split(",").map(Number);

		const filteredCountry = await filtertagRepository.readByTags(tagIds);

		const filteredCountriesByCountryId = filteredCountry.filter(
			(entry) => entry.country_id === countryId,
		);

		if (filteredCountriesByCountryId.length === 0) {
			res.sendStatus(404);
		} else {
			res.json(filteredCountriesByCountryId);
		}
	} catch (err) {
		next(err);
	}
};

export default { browse, read };
