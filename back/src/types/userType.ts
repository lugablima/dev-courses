export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	createdAt: Date;
}
