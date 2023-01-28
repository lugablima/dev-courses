import db from "../database/postgres";
import { Course, CreateInDatabase, ResponseListAll } from "../types/courseType";

export async function findAll() {
	return db.query<ResponseListAll>(`
        SELECT c.id, c.name, c.teacher, ca.name AS category, c.description, 
		json_build_object('id', i.id, 'name', i.name, 'type', i.type, 'data', i.data) AS image, c."isEnabled" 
        FROM courses c
        JOIN categories ca ON ca.id = c."categoryId"
		JOIN images i ON i.id = c."imageId"
    `);
}

export async function findByName(courseName: string) {
	return db.query<Course, string[]>("SELECT * FROM courses WHERE name = $1", [courseName]);
}

export async function create({ name, teacher, categoryId, description, imageId }: CreateInDatabase) {
	return db.query<Course, (string | number)[]>(
		`INSERT INTO courses (name, teacher, "categoryId", description, "imageId") 
        VALUES ($1, $2, $3, $4, $5)`,
		[name, teacher, categoryId, description, imageId]
	);
}
