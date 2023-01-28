import { Request, Response } from "express";
import * as authType from "../types/authType";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
	const userInfo: authType.SignUpPayload = req.body;

	await authService.signUp(userInfo);

	res.status(201).send("Usuário cadastrado com sucesso.");
}

export async function signIn(req: Request, res: Response) {
	const userInfo: authType.SignInPayload = req.body;

	const responseSignIn = await authService.signIn(userInfo);

	res.status(200).send(responseSignIn);
}
