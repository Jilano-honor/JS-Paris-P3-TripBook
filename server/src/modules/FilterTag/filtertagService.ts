import type { NextFunction, Request, Response } from "express";

const validateFiltertag = (req: Request, res: Response, next: NextFunction) => {
	const tagId = Number(req.params.id);

	if (Number.isNaN(tagId)) {
		return res.status(400).json({ error: "Le tag_id n'est pas valide" });
	}
	next();
};

export default { validateFiltertag };
