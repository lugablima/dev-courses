export interface Image {
	id: number;
	name: string;
	type: string;
	data: Buffer;
}

export interface ImagePayload {
	name?: string;
	type?: string;
	data?: Buffer;
}
