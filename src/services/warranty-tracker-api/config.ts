export const config = {
    jwt: {
        secret: process.env.JWT_SECRET ?? "asdf13jj8f23lk32oo;asdfj3",
        tokenIssuer: process.env.JWT_TOKEN_ISSUER ?? "http://localhost:3000",
        tokenAudience:
            process.env.JWT_TOKEN_AUDIENCE ?? "http://localhost:3000",
    },
    dbConnectionString:
        process.env.JWT_SECRET ?? "mongodb://127.0.0.1:27017/warranty-tracker",
};
