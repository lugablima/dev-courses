import * as courseRepository from "../repositories/courseRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as imageRepository from "../repositories/imageRepository";
import * as userRepository from "../repositories/userRepository";
import * as courseType from "../types/courseType";
import * as categoryType from "../types/categoryType";
import { ImagePayload } from "../types/imageType";
import * as errorHandlingUtils from "../utils/errorHandlingUtils";
import { mapObjectToUpdateQuery } from "../utils/sqlUtils";

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

async function validateUserWithPermission(userId: number): Promise<void> {
	const { rows: users } = await userRepository.findById(userId);
	const user = users[0];

	if (!user.isAdmin) {
		throw errorHandlingUtils.unauthorizedError("Apenas o usuário administrador pode efetuar essa operação.");
	}
}

async function validateIfCourseExists(courseId: number): Promise<courseType.Course> {
	if (!courseId) {
		throw errorHandlingUtils.badRequestError("Parâmetro de rota courseId inválido.");
	}

	const { rowCount: courseExists, rows: courses } = await courseRepository.findById(courseId);

	if (!courseExists) {
		throw errorHandlingUtils.notFoundError("Curso não encontrado.");
	}

	return courses[0];
}

async function validateConflictWithCourseEnabledField(course: courseType.Course, expectValue: boolean): Promise<void> {
	if (course.isEnabled !== expectValue) {
		throw errorHandlingUtils.conflictError("O curso já está desativado ou ativado.");
	}
}

export async function listAll(): Promise<courseType.ResponseListAll[]> {
	const { rows: courses } = await courseRepository.findAll();

	courses.map((course) => {
		course.image.data = course.image.data.toString("base64");

		return course;
	});

	return courses;
}

export async function create(
	{ name, teacher, category, description }: courseType.CreatePayload,
	imageInfo: ImagePayload
): Promise<void> {
	await validateCourseNameOrFail(name);

	const { id: categoryId } = await checkIfCategoryExistsOrCreate(category);

	const { rows: images } = await imageRepository.create(imageInfo);

	await courseRepository.create({ name, teacher, categoryId, description, imageId: images[0].id });
}

export async function deactivate(courseId: number, userId: number) {
	await validateUserWithPermission(userId);

	const course = await validateIfCourseExists(courseId);

	await validateConflictWithCourseEnabledField(course, true);

	const { objectColumns, objectValues } = mapObjectToUpdateQuery({ object: { isEnabled: false } });

	await courseRepository.updateById(courseId, objectColumns, objectValues);
}

export async function activate(courseId: number, userId: number) {
	await validateUserWithPermission(userId);

	const course = await validateIfCourseExists(courseId);

	await validateConflictWithCourseEnabledField(course, false);

	const { objectColumns, objectValues } = mapObjectToUpdateQuery({ object: { isEnabled: true } });

	await courseRepository.updateById(courseId, objectColumns, objectValues);
}

export async function edit(
	courseId: number,
	courseInfo?: courseType.EditPayload,
	imageInfo?: ImagePayload
): Promise<void> {
	const editInfo: courseType.EditInDatabase = {};

	if (courseInfo?.name) {
		await validateCourseNameOrFail(courseInfo.name);
		editInfo.name = courseInfo.name;
	}
	if (courseInfo?.teacher) {
		editInfo.teacher = courseInfo.teacher;
	}
	if (courseInfo?.description) {
		editInfo.description = courseInfo.description;
	}
	if (courseInfo?.category) {
		const { id: categoryId } = await checkIfCategoryExistsOrCreate(courseInfo.category);
		editInfo.categoryId = categoryId;
	}
	if (imageInfo?.name && imageInfo?.type && imageInfo?.data) {
		const { rows: images } = await imageRepository.create(imageInfo);
		editInfo.imageId = images[0].id;
	}

	const { objectColumns, objectValues } = mapObjectToUpdateQuery({ object: editInfo });

	await courseRepository.updateById(courseId, objectColumns, objectValues);
}
