import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError, HttpCode } from "../errors/AppError";
import { config } from "../config";

declare global {
    namespace Express {
        interface Request {
            user?: any;
            token?: string;
        }
    }
}

export function parseToken(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const token: string | undefined = request.headers[
        "authorization"
    ]?.substring("bearer ".length);

    if (token) {
        const user = jwt.decode(token);
        request.user = user;
        request.token = token;
    }

    next();
}

export function authorize(
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (!request.user || !request.token) {
        throw new AppError("Token missing.", HttpCode.UNAUTHORIZED, "");
    }

    try {
        jwt.verify(request.token, config.secret, {
            audience: "http://localhost:3000",
            issuer: "http://localhost:3000",
        });

        next();
    } catch (error) {
        throw new AppError("Unauthenticated.", HttpCode.UNAUTHORIZED, "");
    }
}
