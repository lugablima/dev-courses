import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

const app = express();

app.use(cors(), json());
app.use(errorHandlerMiddleware);

export default app;
