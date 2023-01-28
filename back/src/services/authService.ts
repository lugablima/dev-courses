import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authType from "../types/authType";
import * as userType from "../types/userType";
import * as userRepository from "../repositories/userRepository";
import * as errorHandlingUtils from "../utils/errorHandlingUtils";

async function validateIfEmailDoesNotExist(email: string): Promise<void> {
	const { rowCount: emailAlreadyExists } = await userRepository.findByEmail(email);

	if (emailAlreadyExists) {
		throw errorHandlingUtils.conflictError("Email já cadastrado.");
	}
}

async function generateHashPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
}

async function validateCredentials({ email, password }: authType.SignInPayload): Promise<userType.User> {
	const { rowCount: emailExists, rows: user } = await userRepository.findByEmail(email);
	const hashedPassword: string = user[0]?.password;

	if (!emailExists || !bcrypt.compareSync(password, hashedPassword)) {
		throw errorHandlingUtils.unauthorizedError("E-mail e/ou senha inválido(s).");
	}

	return user[0];
}

function generateJwtToken(userId: number): string {
	const data: authType.JwtData = { userId };
	const secretKey = process.env.JWT_SECRET as jwt.Secret;

	const token = jwt.sign(data, secretKey, { expiresIn: "7d" });

	return token;
}

export async function signUp(userInfo: authType.SignUpPayload): Promise<void> {
	await validateIfEmailDoesNotExist(userInfo.email);

	const hashedPassword = await generateHashPassword(userInfo.password);

	await userRepository.createOne({ ...userInfo, password: hashedPassword });
}

export async function signIn(userInfo: authType.SignInPayload): Promise<authType.ResponseSignIn> {
	const { id: userId, name } = await validateCredentials(userInfo);

	const responseSignIn: authType.ResponseSignIn = {
		name,
		token: generateJwtToken(userId),
	};

	return responseSignIn;
}
