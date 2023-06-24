import { IUser } from "../models/IUser";
import User from "../models/IUser";

export class UserRepository {
    public async createUser(user: IUser): Promise<void> {
        await User.create(user);
    }

    public async getUser(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }
}

export const userRepository = new UserRepository();
