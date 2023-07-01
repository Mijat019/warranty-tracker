import bcrypt from "bcrypt";
import { IUser } from "../models/IUser";
import { UserRepository, userRepository } from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { v4 } from "uuid";
import {
    createCredentialsIncorrectError,
    createEmailIsTakenError,
    createUserNotFoundError,
} from "../errors/errors";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    public getAll = async (): Promise<IUser[]> => {
        const users = await this.userRepository.getAll();

        return users;
    };

    public register = async (user: IUser): Promise<void> => {
        const existingUser: IUser | null = await this.userRepository.getByEmail(
            user.email
        );

        if (existingUser) {
            throw createEmailIsTakenError(user.email);
        }

        const password = await this.hashPassword(user.password);
        user.password = password;

        await this.userRepository.addUser(user);
    };

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        password = await bcrypt.hash(password, salt);

        return password;
    }

    public login = async (email: string, password: string): Promise<string> => {
        const user: IUser | null = await this.userRepository.getByEmail(email);

        if (user === null) {
            throw createCredentialsIncorrectError();
        }

        const doCredentialsMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!doCredentialsMatch) {
            throw createCredentialsIncorrectError();
        }

        const token: string = jwt.sign(
            { email, id: user.id },
            config.jwt.secret,
            {
                issuer: config.jwt.tokenIssuer,
                audience: config.jwt.tokenAudience,
                expiresIn: "1h",
                jwtid: v4(),
            }
        );

        return token;
    };

    public checkIfUserExists = async (userId: string): Promise<void> => {
        const user: IUser | null = await this.userRepository.getById(userId);

        if (!user) {
            throw createUserNotFoundError();
        }
    };
}

export const userService = new UserService(userRepository);
