import db from "../database/postgres";

export async function findAll() {
	return db.query(`
        SELECT c.id, c.name, u.name AS teacher, ca.name AS category, c.description, c.picture, c."isEnabled" 
        FROM courses c
        JOIN users u ON u.id = c."teacherId"
        JOIN categories ca ON ca.id = c."categoryId"
    `);
}
