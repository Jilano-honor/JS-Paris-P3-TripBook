import type { RequestHandler } from "express";
import TagRepository from "./TagRepository";

const readTags: RequestHandler = async (req, res, next) => {
	try {
		const themeId = Number(req.params.id);
		const tag_id = await TagRepository.readByTheme(themeId);

		if (tag_id.length === 0) {
			res.sendStatus(404);
		} else {
			res.json(tag_id);
		}
	} catch (err) {
		next(err);
	}
};

export default { readTags };
