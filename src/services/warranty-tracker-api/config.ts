export const config = {
    secret: process.env.JWT_SECRET ?? "asdf13jj8f23lk32oo;asdfj3",
    dbConnectionString: process.env.JWT_SECRET ?? "mongodb://127.0.0.1:27017/warranty-tracker"
}