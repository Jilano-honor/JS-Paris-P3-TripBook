import type { NextFunction, Request, Response } from "express";

const validateTrip = (req: Request, res: Response, next: NextFunction) => {
	const Name = req.body.name;
	const StartDate = req.body.start_at;
	const EndDate = req.body.end_at;
	const Description = req.body.description;
	const Photo = req.body.photo;

	if (typeof Name !== "string" || Name.length < 5) {
		return res
			.status(400)
			.json({ error: "Le nom doit contenir au moins 5 caractère." });
	}

	if (!StartDate || Number.isNaN(Date.parse(StartDate))) {
		return res
			.status(400)
			.json({ error: "La date de debut n'est pas valide." });
	}

	if (!EndDate || Number.isNaN(Date.parse(EndDate))) {
		return res.status(400).json({ error: "La date de fin n'est pas valide." });
	}

	const startDate = new Date(StartDate);
	const endDate = new Date(EndDate);

	if (startDate >= endDate) {
		return res.status(400).json({
			error: "La date de début doit être antérieure à la date de fin.",
		});
	}
	if (typeof Description !== "string" || Description.length < 5) {
		return res
			.status(400)
			.json({ error: "La description doit contenir au moins 5 caractères." });
	}
	if (
		!Photo ||
		typeof Photo !== "string" ||
		!Photo.toLowerCase().endsWith(".png")
	) {
		return res.status(400).json({
			error: "La photo doit être une URL valide se terminant par .png.",
		});
	}

	next();
};

export default { validateTrip };
