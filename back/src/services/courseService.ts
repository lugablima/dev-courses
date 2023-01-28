import * as courseRepository from "../repositories/courseRepository";
import * as courseType from "../types/courseType";

export async function listAll(): Promise<courseType.ResponseListAll[]> {
	const { rows: courses } = await courseRepository.findAll();

	return courses;
}
