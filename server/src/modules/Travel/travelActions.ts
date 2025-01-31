import type { Request, RequestHandler, Response } from "express";
import addtravelRepository from "./travelRepository";
import travelRepository from "./travelRepository";

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
const browse: RequestHandler = async (req, res, next) => {
	try {
		const allcountry = await travelRepository.readAll();
		res.json(allcountry);
	} catch (err) {
		next(err);
	}
};

const getTrip = async (request: Request, response: Response) => {
	try {
		const [Trip] = await travelRepository.readTrip(Number(request.params.id));
		response.json(Trip);
	} catch (error) {
		console.error(error);
		response.sendStatus(500);
	}
};

export default { add, getTrip, browse };
