import { Router } from "express";
import authRouter from "./authRouter";
import courseRouter from "./courseRouter";

const router = Router();

router.use(authRouter);
router.use("/courses", courseRouter);

export default router;
