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
		const tagIds = req.query.tag_ids
			? Array.isArray(req.query.tag_ids)
				? req.query.tag_ids.map(Number)
				: [Number(req.query.tag_ids)]
			: [];

		const filteredCountries = await filtertagRepository.readByTags(tagIds);

		if (filteredCountries.length === 0) {
			res.sendStatus(404);
		} else {
			res.json(filteredCountries);
		}
	} catch (err) {
		next(err);
	}
};

export default { browse, read };
