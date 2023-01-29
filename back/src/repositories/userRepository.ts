import db from "../database/postgres";
import * as authType from "../types/authType";
import { User } from "../types/userType";

export async function findByEmail(email: string) {
	return db.query<User, string[]>(`SELECT * FROM users WHERE email = $1`, [email]);
}

export async function findById(userId: number) {
	return db.query<User, number[]>(`SELECT * FROM users WHERE id = $1`, [userId]);
}

export async function createOne({ name, email, password }: authType.SignUpPayload) {
	return db.query<User, string[]>(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [
		name,
		email,
		password,
	]);
}
