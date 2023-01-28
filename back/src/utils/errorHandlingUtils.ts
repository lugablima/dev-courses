export type ApplicationError = {
	name: string;
	message: string;
};

export function conflictError(message?: string): ApplicationError {
	return { name: "ConflictError", message: message ?? "" };
}

export function unauthorizedError(message?: string): ApplicationError {
	return { name: "UnauthorizedError", message: message ?? "" };
}
