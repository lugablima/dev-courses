import { Request, Response } from "express";
import * as courseType from "../types/courseType";
import * as courseService from "../services/courseService";
import { ImagePayload } from "../types/imageType";

export async function listAll(req: Request, res: Response) {
	const courses = await courseService.listAll();

	res.status(200).send(courses);
}

export async function create(req: Request, res: Response) {
	const course: courseType.CreatePayload = req.body;
	const imageInfo: ImagePayload = {
		name: req.file?.originalname,
		type: req.file?.mimetype,
		data: req.file?.buffer.toString("base64"),
	};

	await courseService.create(course, imageInfo);

	res.status(201).send("Curso criado com sucesso.");
}

export async function deactivate(req: Request, res: Response) {
	const courseId = parseInt(req.params.courseId);
	const userId: number = res.locals.userId;

	await courseService.deactivate(courseId, userId);

	res.status(200).send("Curso desativado com sucesso.");
}

export async function activate(req: Request, res: Response) {
	const courseId = parseInt(req.params.courseId);
	const userId: number = res.locals.userId;

	await courseService.activate(courseId, userId);

	res.status(200).send("Curso ativado com sucesso.");
}

export async function edit(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const courseId = parseInt(req.params.courseId);
	const course: courseType.EditPayload = req.body;
	const imageInfo: ImagePayload = {
		name: req.file?.originalname,
		type: req.file?.mimetype,
		data: req.file?.buffer.toString("base64"),
	};

	await courseService.edit(userId, courseId, course, imageInfo);

	res.status(200).send("Curso editado com sucesso.");
}
