import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class ErrorController {
    public handleError = (
        error: Error | AppError,
        request: Request,
        response: Response,
        next: NextFunction
    ): void => {
        if (error instanceof AppError) {
            response.status(error.httpCode).json({
                title: error.name,
                detail: error.message,
                instance: request.path,
            });
        } else {
            console.log(error);

            response.status(500).json({
                title: "Internal server error",
                detail: "bla bla",
                instance: request.path,
                error,
            });
        }
    };
}

export const errorController = new ErrorController();
