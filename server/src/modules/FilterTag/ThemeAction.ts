import type { RequestHandler } from "express";
import ThemeRepository from "./ThemeRepository";

const readTheme: RequestHandler = async (req, res, next) => {
	try {
		const themeId = await ThemeRepository.readTheme();

		if (!themeId) {
			res.sendStatus(404);
		} else {
			res.json({ themeId });
		}
	} catch (err) {
		next(err);
	}
};

export default { readTheme };
