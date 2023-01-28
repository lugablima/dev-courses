import db from "../database/postgres";
import * as authType from "../types/authType";

export async function findByEmail(email: string) {
	return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export async function createOne({ name, email, password }: authType.SignUpPayload) {
	return db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
}
