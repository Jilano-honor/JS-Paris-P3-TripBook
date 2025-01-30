import type { Request, Response } from "express";
import addtravelRepository from "./tripRepository";

const add = async (req: Request, res: Response) => {
	try {
		const trip = req.body;
		const [result] = await addtravelRepository.createTrip(trip);
		if (result.affectedRows > 0) {
			res.sendStatus(201);
		} else {
			res.sendStatus(400);
		}
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

export default { add };
