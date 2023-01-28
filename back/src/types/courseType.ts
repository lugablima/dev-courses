export interface Course {
	id: number;
	name: string;
	teacherId: number;
	categoryId: number;
	description: string;
	picture: string;
	isEnabled: boolean;
	createdAt: Date;
}

export type ResponseListAll = Omit<Course, "teacherId" | "categoryId" | "createdAt"> & {
	teacher: string;
	category: string;
};
