import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { createTokenInvalidError, createTokenMissingError } from "../errors/errors";

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
        throw createTokenMissingError();
    }

    try {
        jwt.verify(request.token, config.secret, {
            audience: "http://localhost:3000",
            issuer: "http://localhost:3000",
        });

        next();
    } catch (error) {
        throw createTokenInvalidError();
    }
}
