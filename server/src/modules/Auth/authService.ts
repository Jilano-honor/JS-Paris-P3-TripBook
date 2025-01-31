import argon from "argon2";
import type { NextFunction, Request, Response } from "express";

const hash = async (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body.password = await argon.hash(req.body.password);
		next();
	} catch (error) {
		next(error);
	}
};

export default { hash };
