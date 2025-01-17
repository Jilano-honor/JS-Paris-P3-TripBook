import type { NextFunction, Request, Response } from "express";

const validateTrip = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const Name = req.body.name;
	const StartDate = req.body.start_date;
	const EndDate = req.body.end_date;
	const Description = req.body.description;
	const Photo = req.body.photo;

	// Vérifier le nom
	if (typeof Name !== "string" || Name.length < 5) {
		res
			.status(400)
			.json({ error: "Le nom doit contenir au moins 5 caractères." });
	}

	// Vérifier la date de début
	if (!StartDate || Number.isNaN(Date.parse(StartDate))) {
		res.status(400).json({ error: "La date de début n'est pas valide." });
	}

	// Vérifier la date de fin
	if (!EndDate || Number.isNaN(Date.parse(EndDate))) {
		res.status(400).json({ error: "La date de fin n'est pas valide." });
	}

	// Vérifier que la date de début est antérieure à la date de fin
	const startDate = new Date(StartDate);
	const endDate = new Date(EndDate);
	if (startDate >= endDate) {
		res.status(400).json({
			error: "La date de début doit être antérieure à la date de fin.",
		});
	}

	// Vérifier la description
	if (typeof Description !== "string" || Description.length < 5) {
		res
			.status(400)
			.json({ error: "La description doit contenir au moins 5 caractères." });
	}

	// Vérifier la photo
	if (
		!Photo ||
		typeof Photo !== "string" ||
		!Photo.toLowerCase().endsWith(".png")
	) {
		res.status(400).json({
			error: "La photo doit être une URL valide se terminant par .png.",
		});
	}

	// Si toutes les validations passent, appeler next() pour continuer l'exécution
	next();
};

export default { validateTrip };
