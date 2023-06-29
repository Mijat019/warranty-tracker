import { User, IUser } from "../models/IUser";

export class UserRepository {
    public createUser = async (user: IUser): Promise<void> => {
        await User.create(user);
    };
    public getByEmail = async (email: string): Promise<IUser | null> => {
        return await User.findOne({ email });
    };
    
    public getAll = async (): Promise<IUser[]> => {
        return await User.find({});
    };
    
    public getById = async (id: string): Promise<IUser | null> => {
        return await User.findById(id);
    };
    
    public addLabels = async (userId: string, labels: string[]): Promise<void> => {
        await User.findOneAndUpdate({ _id: userId }, { $addToSet: { labels } })
    }

    public removeLabels = async (userId: string, labels: string[]): Promise<void> => {
        await User.findOneAndUpdate({ _id: userId }, { $pull: { labels } })
    }
}

export const userRepository = new UserRepository();
