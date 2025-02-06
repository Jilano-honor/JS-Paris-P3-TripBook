import type { Request, RequestHandler, Response } from "express";
import tripRepository from "./tripRepository";

const add = async (req: Request, res: Response) => {
	try {
		const trip = req.body;

		const [result] = await tripRepository.createTrip(trip);
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
const browseAllByCountry = async (req: Request, res: Response) => {
	try {
		const countryId = Number(req.params.country_id);
		const [result] = await tripRepository.readTrips(countryId);
		if (result.length > 0) res.status(200).json(result);
		else {
			res.sendStatus(400);
		}
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
const browse = async (req: Request, res: Response) => {
	try {
		const tripId = Number(req.params.id_trip);
		const [result] = await tripRepository.readTrip(tripId);
		if (result.length > 0) res.status(200).json(result);
		else {
			res.sendStatus(400);
		}
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

export default { add, browseAllByCountry, browse };
