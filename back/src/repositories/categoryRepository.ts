import db from "../database/postgres";
import { Category } from "../types/categoryType";

export async function findByName(categoryName: string) {
	return db.query<Category, string[]>(`SELECT * FROM categories WHERE name = $1`, [categoryName]);
}

export async function create(categoryName: string) {
	return db.query<Category, string[]>(`INSERT INTO categories (name) VALUES ($1) RETURNING *`, [categoryName]);
}
