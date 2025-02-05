import type { RequestHandler } from "express";
import ThemeRepository from "./ThemeRepository";

const readthemes: RequestHandler = async (req, res, next) => {
	try {
		const theme = await ThemeRepository.readthemes();

		if (!theme) {
			res.sendStatus(404);
		} else {
			res.json({ theme });
		}
	} catch (err) {
		next(err);
	}
};

export default { readthemes };
