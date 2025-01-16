import type { RequestHandler } from "express";
import filtertagRepository from "./filtertagRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const allcountry = await filtertagRepository.readAll();
		res.json(allcountry);
	} catch (err) {
		next(err);
	}
};

const read: RequestHandler = async (req, res, next) => {
	try {
		const countryId = Number(req.params.id);

		const tagIds = req.query.tag_ids
			? Array.isArray(req.query.tag_ids)
				? req.query.tag_ids.map(Number)
				: [Number(req.query.tag_ids)]
			: [];

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
