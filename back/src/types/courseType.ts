import { Image } from "./imageType";

export interface Course {
	id: number;
	name: string;
	teacher: string;
	categoryId: number;
	description: string;
	imageId: number;
	isEnabled: boolean;
	createdAt: Date;
}

export type ResponseListAll = Omit<Course, "categoryId" | "imageId" | "createdAt"> & {
	category: string;
	image: Image;
};

export type CreatePayload = Omit<ResponseListAll, "id" | "image" | "isEnabled">;

export type EditPayload = Partial<CreatePayload>;

export type CreateInDatabase = Omit<Course, "id" | "isEnabled" | "createdAt"> & {
	isEnabled?: boolean;
};

export type EditInDatabase = Partial<CreateInDatabase>;
