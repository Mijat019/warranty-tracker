import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import warrantyRoutes from "./routes/warrantyRoutes";
import mongoose from "mongoose";
import morgan from "morgan";
import { parseToken } from "./middleware/authorization";
import labelRoutes from "./routes/labelRoutes";
import { errorController } from "./controllers/ErrorController";

dotenv.config();

const app: Express = express();

mongoose
    .connect("mongodb://127.0.0.1:27017/warranty-tracker")
    .then(() => console.log("[Server] Connected to mongodb"))
    .catch((error) =>
        console.log(`[Server] Failed to connect to mongodb due to ${error}`)
    );

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(parseToken);

app.use("/api/warranties", warrantyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/labels", labelRoutes);

app.use(errorController.handleError)

app.use(express.static("public/uploads"));

export default app;
