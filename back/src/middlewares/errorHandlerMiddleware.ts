import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../utils/errorHandlingUtils";

export default function errorHandlerMiddleware(
	error: ApplicationError | Error,
	req: Request,
	res: Response,
	_next: NextFunction
) {
	return res.status(500).send({ message: "Internal Server Error" });
}
