import { User } from "../models/IUser";
import { Warranty, IWarranty } from "../models/IWarranty";

export class WarrantyRepository {
    public getById = async (id: string): Promise<IWarranty | null> => {
        return await Warranty.findById(id);
    };

    public getAll = async (filter = {}): Promise<IWarranty[]> => {
        return await Warranty.find(filter);
    };

    public add = async (
        userId: string,
        warranty: IWarranty
    ): Promise<IWarranty> => {
        const newWarranty = await Warranty.create(warranty);

        await User.updateOne(
            { _id: userId },
            { $push: { warrantyIds: newWarranty.id } }
        );

        return newWarranty;
    };

    public remove = async (
        userId: string,
        warrantyId: string
    ): Promise<void> => {
        await Warranty.findByIdAndDelete(warrantyId);

        await User.updateOne(
            { _id: userId },
            { $pull: { warrantyIds: warrantyId } }
        );
    };
}

export const warrantyRepository = new WarrantyRepository();