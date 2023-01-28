import { Router } from "express";
import * as courseController from "../controllers/courseController";

const courseRouter = Router();

courseRouter.get("/", courseController.listAll);

export default courseRouter;
