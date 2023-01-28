import db from "../database/postgres";
import { Image, ImagePayload } from "../types/imageType";

export async function create({ name, type, data }: ImagePayload) {
	return db.query<Image>(`INSERT INTO images (name, type, data) VALUES ($1, $2, $3) RETURNING *`, [name, type, data]);
}
