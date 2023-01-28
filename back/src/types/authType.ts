import { User } from "./userType";

export type SignUpPayload = Omit<User, "id" | "isAdmin" | "createdAt">;

export type SignInPayload = Omit<SignUpPayload, "name">;

export interface JwtData {
	userId: number;
}

export interface ResponseSignIn {
	name: string;
	token: string;
}
