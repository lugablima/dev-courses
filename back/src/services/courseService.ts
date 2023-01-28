import * as courseRepository from "../repositories/courseRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as imageRepository from "../repositories/imageRepository";
import * as courseType from "../types/courseType";
import * as categoryType from "../types/categoryType";
import { ImagePayload } from "../types/imageType";
import * as errorHandlingUtils from "../utils/errorHandlingUtils";

async function validateCourseNameOrFail(courseName: string): Promise<void> {
	const { rowCount: courseNameAlreadyExists } = await courseRepository.findByName(courseName);

	if (courseNameAlreadyExists) {
		throw errorHandlingUtils.conflictError("Já existe um curso com este nome.");
	}
}

async function checkIfCategoryExistsOrCreate(categoryName: string): Promise<categoryType.Category> {
	const { rowCount: categoryExists, rows: categories } = await categoryRepository.findByName(categoryName);

	if (!categoryExists) {
		const { rows: newCategories } = await categoryRepository.create(categoryName);

		return newCategories[0];
	}

	return categories[0];
}

export async function listAll(): Promise<courseType.ResponseListAll[]> {
	const { rows: courses } = await courseRepository.findAll();

	return courses;
}

export async function create(
	{ name, teacher, category, description }: courseType.CreatePayload,
	imageInfo: ImagePayload
) {
	await validateCourseNameOrFail(name);

	const { id: categoryId } = await checkIfCategoryExistsOrCreate(category);

	const { rows: images } = await imageRepository.create(imageInfo);

	await courseRepository.create({ name, teacher, categoryId, description, imageId: images[0].id });
}
