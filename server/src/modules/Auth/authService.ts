import argon from "argon2";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const hash = async (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body.password = await argon.hash(req.body.password);
		next();
	} catch (error) {
		next(error);
	}
};
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;
	if (!token) res.sendStatus(401);
	else {
		const isTokenValid = jwt.verify(token, process.env.APP_SECRET as string);
		if (!isTokenValid) res.sendStatus(401);
		else next();
	}
};
export default { hash, isAuth };
