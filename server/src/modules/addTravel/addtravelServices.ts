import type { NextFunction, Request, Response } from "express";

const validateTrip = (req: Request, res: Response, next: NextFunction) => {
	const Name = req.body.name;
	const StartDate = req.body.start_date;
	const EndDate = req.body.end_date;
	const Description = req.body.description;
	const Photo = req.body.photo;

	if (typeof Name !== "string" || Name.length > 5) {
		res
			.status(400)
			.json({ error: "Le nom doit contenir au moins 5 caractère." });
	}
	if (!StartDate || Number.isNaN(Date.parse(StartDate))) {
		res.status(400).json({ error: "La date de debut n'est pas valide." });
	}
	if (!EndDate || Number.isNaN(Date.parse(EndDate))) {
		res.status(400).json({ error: "La date de fin n'est pas valide." });
	}
	const startDate = new Date(StartDate);
	const endDate = new Date(EndDate);
	if (startDate >= endDate) {
		res.status(400).json({
			error: "La date de début doit être antérieure à la date de fin.",
		});
	}
	if (typeof Description !== "string" || Description.length < 5) {
		res
			.status(400)
			.json({ error: "La description doit contenir au moins 5 caractères." });
	}
	if (
		!Photo ||
		typeof Photo !== "string" ||
		!Photo.toLowerCase().endsWith(".png")
	) {
		res.status(400).json({
			error: "La photo doit être une URL valide se terminant par .png.",
		});
	}

	next();
};

export default { validateTrip };

// // Validation de `name`
// if (typeof trip.name !== "string" || trip.name.length > 5) {
// 	return res
// 		.status(400)
// 		.json({ error: "Le nom doit contenir au moins 5 caractère." });
// }

// // Validation de `start_date`

// // Validation de `end_date`
// if (!trip.end_date || Number.isNaN(Date.parse(trip.end_date))) {
// 	return res.status(400).json({ error: "La date de fin n'est pas valide." });
// }

// // Vérification que `start_date` est avant `end_date`
// const startDate = new Date(trip.start_date);
// const endDate = new Date(trip.end_date);
// if (startDate >= endDate) {
// 	return res.status(400).json({
// 		error: "La date de début doit être antérieure à la date de fin.",
// 	});
// }

// // Validation de `description`
// if (typeof trip.description !== "string" || trip.description.length < 25) {
// 	return res
// 		.status(400)
// 		.json({ error: "La description doit contenir au moins 25 caractères." });
// }

// // Validation de `photo`
// if (
// 	!trip.photo ||
// 	typeof trip.photo !== "string" ||
// 	!trip.photo.toLowerCase().endsWith(".png")
// ) {
// 	return res.status(400).json({
// 		error: "La photo doit être une URL valide se terminant par .png.",
// 	});
// }

// // Tout est valide, on passe au middleware suivant
