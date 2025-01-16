import type { NextFunction, Request, Response } from "express";

const validateTrip = (req: Request, res: Response, next: NextFunction) => {
	const trip = req.body;

	// Validation de `name`
	if (typeof trip.name !== "string" || trip.name.length > 5) {
		res
			.status(400)
			.json({ error: "Le nom doit contenir au moins 5 caractère." });
	}

	// Validation de `start_date`

	// Validation de `end_date`
	if (!trip.end_date || Number.isNaN(Date.parse(trip.end_date))) {
		res.status(400).json({ error: "La date de fin n'est pas valide." });
	}

	// Vérification que `start_date` est avant `end_date`
	const startDate = new Date(trip.start_date);
	const endDate = new Date(trip.end_date);
	if (startDate >= endDate) {
		res.status(400).json({
			error: "La date de début doit être antérieure à la date de fin.",
		});
	}

	// Validation de `description`
	if (typeof trip.description !== "string" || trip.description.length < 25) {
		res
			.status(400)
			.json({ error: "La description doit contenir au moins 25 caractères." });
	}

	// Validation de `photo`
	if (
		!trip.photo ||
		typeof trip.photo !== "string" ||
		!trip.photo.toLowerCase().endsWith(".png")
	) {
		res.status(400).json({
			error: "La photo doit être une URL valide se terminant par .png.",
		});
	}

	// Tout est valide, on passe au middleware suivant
	next();
};

export default { validateTrip };
