import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import warrantyRoutes from "./routes/warrantyRoutes";
import mongoose from "mongoose";
import morgan from "morgan";
import { parseToken } from "./middleware/authorization";
import labelRoutes from "./routes/labelRoutes";
import { errorController } from "./controllers/ErrorController";
import { config } from "./config";
import userWarrantyRoutes from "./routes/userWarrantyRoutes";

dotenv.config();

const app: Express = express();

mongoose
    .connect(config.dbConnectionString)
    .then(() => console.log("[Server] Connected to mongodb"))
    .catch((error) =>
        console.log(`[Server] Failed to connect to mongodb due to ${error}`)
    );

app.use(morgan("tiny"));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(parseToken);

app.use("/api/warranties", warrantyRoutes);
app.use("/api/users/:userId/labels", labelRoutes);
app.use("/api/users/:userId/warranties", userWarrantyRoutes)
app.use("/api/users", userRoutes);

app.use(errorController.handleError)

app.use(express.static("public/uploads"));

app.use((req: Request, res: Response) => {
    res.status(404).json({ status: 404, title: `${req.path} not found.` })
})

export default app;
