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
		const tagId = Number(req.params.id);

		const filteredCountries = await filtertagRepository.readByTags(tagId);

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
