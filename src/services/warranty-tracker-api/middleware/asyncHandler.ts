import { NextFunction, Request, Response } from "express";

export function asyncHandler(callback: any) {
    return async function (request: Request, response: Response, next: NextFunction) {
        try {
            await callback(request, response, next);
        } catch (error) {
            next(error);
        }
    };
}
