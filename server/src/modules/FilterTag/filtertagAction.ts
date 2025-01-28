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

const readTags: RequestHandler = async (req, res, next) => {
	try {
		const tag_id = await filtertagRepository.readTag();

		if (tag_id.length === 0) {
			res.sendStatus(404);
		} else {
			res.json(tag_id);
		}
	} catch (err) {
		next(err);
	}
};

export default { browse, read, readTags };
