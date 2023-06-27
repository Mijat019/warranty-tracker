import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class ErrorController {
    public handleError = (error: Error | AppError, request: Request, response: Response, next: NextFunction): void => {
        if (error instanceof AppError) {
            response.status(error.httpCode).json({ title: error.name, detail: error.message, instance: request.path });
        } else {
            response.status(500).json({ title: "Internal server error", detail: "bla bla", instance: request.path });
        }
    }
}

export const errorController = new ErrorController();