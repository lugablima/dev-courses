export interface Image {
	id: number;
	name: string;
	type: string;
	data: Buffer | string;
}

export interface ImagePayload {
	name?: string;
	type?: string;
	data?: Buffer | string;
}
