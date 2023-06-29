import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function validateRequest(schema: Joi.Schema) {
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
}
