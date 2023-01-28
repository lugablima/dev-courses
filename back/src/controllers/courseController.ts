import { Request, Response } from "express";
import * as courseType from "../types/courseType";
import * as courseService from "../services/courseService";
import { ImagePayload } from "../types/imageType";

export async function listAll(req: Request, res: Response) {
	const courses = await courseService.listAll();

	res.status(200).send(courses);
}

export async function create(req: Request, res: Response) {
	const courses: courseType.CreatePayload = req.body;
	const pictureInfo: ImagePayload = {
		name: req.file?.originalname,
		type: req.file?.mimetype,
		data: req.file?.buffer,
	};

	await courseService.create(courses, pictureInfo);

	res.status(201).send("Curso criado com sucesso.");
}

export async function deactivate(req: Request, res: Response) {
	const courseId = parseInt(req.params.courseId);

	await courseService.deactivate(courseId);

	res.status(200).send("Curso desativado com sucesso.");
}

export async function activate(req: Request, res: Response) {
	const courseId = parseInt(req.params.courseId);

	await courseService.activate(courseId);

	res.status(200).send("Curso ativado com sucesso.");
}
