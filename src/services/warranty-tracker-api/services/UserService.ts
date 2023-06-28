import bcrypt from "bcrypt";
import { IUser } from "../models/IUser";
import { UserRepository, userRepository } from "../repositories/UserRepository";
import { AppError, HttpCode } from "../errors/AppError";

export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public getAll = async (): Promise<IUser[]> => {
        const users = await this.userRepository.getAll();

        return users;
    }

    public register = async (user: IUser): Promise<void> => {
        const existingUser: IUser | null = await this.userRepository.getByEmail(user.email);

        if (existingUser) {
            throw new AppError("The email is taken.", HttpCode.BAD_REQUEST, `The email ${user.email} is already taken`);
        }

        const { password, salt } = await this.hashPassword(user.password);
        user.password = password;
        user.salt = salt;

        await this.userRepository.createUser(user);
    }

    public login = async (email: string, password: string) => {
        const user: IUser | null = await this.userRepository.getByEmail(email);

        if (user == null || await bcrypt.compare(password, user.password)) {
            throw new AppError("Credentials incorrect", HttpCode.BAD_REQUEST, "")
        }

        
    }

    private async hashPassword(
        password: string
    ): Promise<{ password: string; salt: string }> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        password = await bcrypt.hash(password, salt);

        return { password, salt };
    }
}

export const userService = new UserService(userRepository);
