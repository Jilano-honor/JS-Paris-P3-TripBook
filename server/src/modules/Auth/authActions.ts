import argon from "argon2";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../User/userRepository";
const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		const [[user]] = await userRepository.readUserByEmail(email);
		if (!user) res.sendStatus(404);
		else {
			const passwordMatch = await argon.verify(user.password, password);
			if (!passwordMatch) res.sendStatus(422);
			else {
				const token = jwt.sign(
					{ id: user.id },
					process.env.APP_SECRET as string,
					{
						expiresIn: "1h",
					},
				);
				user.token = token;
				res.status(200).json(user);
			}
		}
	} catch (error) {
		next(error);
	}
};

export default { login };
