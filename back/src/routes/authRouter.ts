import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import * as authSchema from "../schemas/authSchema";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", validateSchema(authSchema.signUp), authController.signUp);

export default authRouter;
