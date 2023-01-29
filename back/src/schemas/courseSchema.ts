import joi from "joi";
import * as courseType from "../types/courseType";

export const create = joi.object<courseType.CreatePayload>({
	name: joi.string().trim().min(2).required(),
	teacher: joi.string().trim().min(2).required(),
	category: joi.string().trim().min(2).required(),
	description: joi.string().trim().min(2).required(),
});

export const edit = joi.object<courseType.EditPayload>({
	name: joi.string().trim().min(2),
	teacher: joi.string().trim().min(2),
	category: joi.string().trim().min(2),
	description: joi.string().trim().min(2),
});
