import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import * as authSchema from "../schemas/authSchema";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", validateSchema(authSchema.signUp), authController.signUp);
authRouter.post("/signin", validateSchema(authSchema.signIn), authController.signIn);

export default authRouter;
