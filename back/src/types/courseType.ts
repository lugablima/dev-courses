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
};

export type CreatePayload = Omit<ResponseListAll, "id" | "isEnabled">;

export type CreateInDatabase = Omit<Course, "id" | "isEnabled" | "createdAt"> & {
	isEnabled?: boolean;
};
