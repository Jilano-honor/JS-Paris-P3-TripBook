import type { NextFunction, Request, Response } from "express";
import userRepository from "./userRepository";

const add = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const [result] = await userRepository.createUser(req.body);

		if (!result.insertId) res.sendStatus(422);
		else res.sendStatus(201);
	} catch (error) {
		next(error);
	}
};
const browse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = Number(req.params.id);
		const [result] = await userRepository.readUserById(userId);
		if (result.length > 0) res.status(200).json(result);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
};

export default { add, browse };
