export enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHENTICATED = 401,
    UNAUTHORIZED = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;

    constructor(name: string, httpCode: HttpCode, description: string) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}