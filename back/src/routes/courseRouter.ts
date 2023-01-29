import { Router } from "express";
import multer from "multer";
import validateSchema from "../middlewares/schemaValidator";
import * as courseSchema from "../schemas/courseSchema";
import * as courseController from "../controllers/courseController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const upload = multer();
const courseRouter = Router();

courseRouter.get("/", courseController.listAll);
courseRouter.use(authenticateToken);
courseRouter.post("/", upload.single("image"), validateSchema(courseSchema.create), courseController.create);
courseRouter.patch("/deactivate/:courseId", courseController.deactivate);
courseRouter.patch("/activate/:courseId", courseController.activate);

export default courseRouter;
