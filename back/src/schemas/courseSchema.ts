import joi from "joi";
import * as courseType from "../types/courseType";

export const create = joi.object<courseType.CreatePayload>({
	name: joi.string().trim().min(2).required(),
	teacher: joi.string().trim().min(2).required(),
	category: joi.string().trim().min(2).required(),
	description: joi.string().trim().min(2).required(),
});
