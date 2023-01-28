import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtData } from "../types/authType";
import * as errorHandlingUtils from "../utils/errorHandlingUtils";

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.header("Authorization");
	if (!authHeader) throw errorHandlingUtils.badRequestError("Campo header Authorization não enviado.");

	const result = authHeader.split(" "),
		authenticationType = result[0],
		token = result[1];

	if (authenticationType !== "Bearer") {
		throw errorHandlingUtils.badRequestError("A autenticação deve ser do tipo Bearer.");
	} else if (!token) {
		throw errorHandlingUtils.badRequestError("Token não enviado.");
	}

	try {
		const jwtSecretKey = process.env.JWT_SECRET as string;

		const { userId } = jwt.verify(token, jwtSecretKey) as JwtData;

		res.locals.userId = userId;

		next();
	} catch (error) {
		throw errorHandlingUtils.unauthorizedError("Token inválido.");
	}
}
