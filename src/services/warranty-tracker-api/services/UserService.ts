import bcrypt from "bcrypt";
import { IUser } from "../models/IUser";
import { UserRepository, userRepository } from "../repositories/UserRepository";

export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public getAll = async (): Promise<IUser[]> => {
        const users = await this.userRepository.getAll();

        return users;
    }

    public async register(user: IUser): Promise<void> {
        const { password, salt } = await this.hashPassword(user.password);
        user.password = password;
        user.salt = salt;

        await this.userRepository.createUser(user);
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
