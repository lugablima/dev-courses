import { Request, Response } from "express";
import * as courseService from "../services/courseService";

export async function listAll(req: Request, res: Response) {
	const courses = await courseService.listAll();

	res.status(200).send(courses);
}
