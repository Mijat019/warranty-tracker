import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import Joi from "joi";

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

    public validateRequest = (schema: Joi.Schema) => {
        return async function (
            request: Request,
            response: Response,
            next: NextFunction
        ) {
            try {
                await schema.validateAsync(request.body);

                return next();
            } catch (error: any) {
                response.json({
                    title: "One or more fields are not valid. Check the 'error' field.",
                    status: 400,
                    isSuccess: false,
                    errors: error.details,
                });
            }
        };
    };
}

export const errorController = new ErrorController();
