import { User } from "../models/IUser";
import { Warranty, IWarranty } from "../models/IWarranty";

export class WarrantyRepository {
    public async getAll(): Promise<IWarranty[]> {
        return await Warranty.find({});
    }

    public async add(userId: string, warranty: IWarranty): Promise<IWarranty> {
        const newWarranty = await Warranty.create(warranty);

        await User.updateOne(
            { _id: userId },
            { $push: { warrantyIds: newWarranty.id } }
        );

        return newWarranty;
    }

    public async remove(
        userId: string,
        warrantyId: string
    ): Promise<void> {
        await Warranty.findByIdAndDelete(warrantyId);

        await User.updateOne(
            { _id: userId },
            { $pull: { warrantyIds: warrantyId } }
        );
    }
}

export const warrantyRepository = new WarrantyRepository();
