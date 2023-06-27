import { User, IUser } from "../models/IUser";

export class UserRepository {
    public createUser = async (user: IUser): Promise<void> => {
        await User.create(user);
    }

    public getAll = async (): Promise<IUser[]> => {
        return await User.find({});
    }

    public get = async (id: string): Promise<IUser | null> => {
        return await User.findById(id);
    }
}

export const userRepository = new UserRepository();
