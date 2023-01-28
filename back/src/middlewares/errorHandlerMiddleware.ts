import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../utils/errorHandlingUtils";

export default function errorHandlerMiddleware(
	error: ApplicationError | Error,
	req: Request,
	res: Response,
	_next: NextFunction
) {
	if (error.name === "BadRequestError") {
		return res.status(400).send(error.message);
	}

	if (error.name === "UnauthorizedError") {
		return res.status(401).send(error.message);
	}

	if (error.name === "ConflictError") {
		return res.status(409).send(error.message);
	}

	return res.status(500).send("Erro interno do servidor");
}
