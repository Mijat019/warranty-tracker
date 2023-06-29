import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import { AppError, HttpCode } from "../errors/AppError";

export const routeParamGuard = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    if (req.params.userId !== req.user.id) {
        throw new AppError("Access Forbidden", HttpCode.UNAUTHORIZED, "You are not authorized to access other users' data.")
    }

    next();
});