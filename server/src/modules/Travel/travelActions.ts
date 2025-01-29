import type { Request, RequestHandler, Response } from "express";
import addtravelRepository from "./travelRepository";
import travelRepository from "./travelRepository";

const add = async (req: Request, res: Response) => {
	try {
		const trip = req.body;
		const [result] = await travelRepository.createTrip(trip);
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
const browseAll = async (req: Request, res: Response) => {
	try {
		const countryId = Number(req.params.country_id);
		const [result] = await travelRepository.readTrips(countryId);
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
		const [result] = await travelRepository.readTrip(tripId);
		if (result.length > 0) res.status(200).json(result);
		else {
			res.sendStatus(400);
		}
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
const browseCountry: RequestHandler = async (req, res, next) => {
	try {
		const allcountry = await travelRepository.readAll();
		res.json(allcountry);
	} catch (err) {
		next(err);
	}
};

export default { add, browseAll, browse, browseCountry };
