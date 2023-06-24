import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import warrantyRoutes from "./routes/warrantyRoutes";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();

mongoose
    .connect("mongodb://127.0.0.1:27017/warranty-tracker")
    .then(() => console.log("[Server] Connected to mongodb"))
    .catch((error) =>
        console.log(`[Server] Failed to connect to mongodb due to ${error}`)
    );

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/warranties", warrantyRoutes);

export default app;
