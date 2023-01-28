import joi from "joi";
import * as authType from "../types/authType";

export const signUp = joi.object<authType.SignUpPayload>({
	name: joi.string().trim().min(2).required(),
	email: joi.string().email().required(),
	password: joi.string().trim().min(6).required(),
});

export const signIn = joi.object<authType.SignInPayload>({
	email: joi.string().email().required(),
	password: joi.string().trim().min(6).required(),
});
