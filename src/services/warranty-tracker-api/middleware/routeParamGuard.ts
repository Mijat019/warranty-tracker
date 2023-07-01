import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import { createAccessForbiddenError } from "../errors/errors";

export const routeParamGuard = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    if (req.params.userId !== req.user.id) {
        throw createAccessForbiddenError();
    }

    next();
});