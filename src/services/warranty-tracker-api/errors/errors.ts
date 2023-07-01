import { AppError, HttpCode } from "./AppError";

export function createTokenMissingError(): AppError {
    return new AppError(
        "Token missing",
        HttpCode.UNAUTHENTICATED,
        "You need to provide a token this request."
    );
}

export function createTokenInvalidError(): AppError {
    return new AppError(
        "Invalid token",
        HttpCode.UNAUTHENTICATED,
        "The token you provided is not valid."
    );
}

export function createAccessForbiddenError(): AppError {
    return new AppError(
        "Access Forbidden",
        HttpCode.UNAUTHORIZED,
        "You are not authorized to access other users' data."
    );
}

export function createWarrantyNotFoundError(): AppError {
    return new AppError(
        "Warranty not found",
        HttpCode.NOT_FOUND,
        "Warranty with the given id was not found."
    );
}

export function createFileExtensionNotSupportedError(fileExtension: string): AppError {
    return new AppError(
        "Unsupported file extension",
        HttpCode.BAD_REQUEST,
        `Extension ${fileExtension} is not supported.`
    );
}

export function createEmailIsTakenError(email: string): AppError {
    return new AppError(
        "The email is taken.",
        HttpCode.BAD_REQUEST,
        `The email ${email} is already taken`
    );
}

export function createCredentialsIncorrectError(): AppError {
    return new AppError(
        "Credentials incorrect",
        HttpCode.BAD_REQUEST,
        "The credentials you've provided are incorrect."
    );
}

export function createUserNotFoundError(): AppError {
    return new AppError(
        "User not found",
        HttpCode.NOT_FOUND,
        "User with the given id was not found."
    );
}
