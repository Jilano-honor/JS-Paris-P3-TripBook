import type { NextFunction, Request, Response } from "express";

const validateTrip = (req: Request, res: Response, next: NextFunction) => {
	const Name = req.body.name;
	const StartDate = req.body.start_at;
	const EndDate = req.body.end_at;
	const Description = req.body.description;
	const Photo = req.file;

	if (!Photo) {
		res.status(400).json({
			error: "La photo doit être une URL valide se terminant par .png.",
		});
		return;
	}

	if (typeof Name !== "string" || Name.length < 5) {
		res
			.status(400)
			.json({ error: "Le nom doit contenir au moins 5 caractères." });
		return;
	}

	if (!StartDate || Number.isNaN(Date.parse(StartDate))) {
		res.status(400).json({ error: "La date de début n'est pas valide." });
		return;
	}

	if (!EndDate || Number.isNaN(Date.parse(EndDate))) {
		res.status(400).json({ error: "La date de fin n'est pas valide." });
		return;
	}

	const startDate = new Date(StartDate);
	const endDate = new Date(EndDate);

	if (startDate >= endDate) {
		res.status(400).json({
			error: "La date de début doit être antérieure à la date de fin.",
		});
		return;
	}

	if (typeof Description !== "string" || Description.length < 5) {
		res
			.status(400)
			.json({ error: "La description doit contenir au moins 5 caractères." });
		return;
	}

	next();
};

export default { validateTrip };
