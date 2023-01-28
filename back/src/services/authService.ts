import bcrypt from "bcrypt";
import * as authType from "../types/authType";
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

export async function signUp(userInfo: authType.SignUpPayload): Promise<void> {
	await validateIfEmailDoesNotExist(userInfo.email);

	const hashedPassword = await generateHashPassword(userInfo.password);

	await userRepository.createOne({ ...userInfo, password: hashedPassword });
}
