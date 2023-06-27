import { IUser, User } from "../models/IUser";
import { Warranty, IWarranty } from "../models/IWarranty";

export class WarrantyRepository {
    public async addWarranty(userId: string, warranty: IWarranty): Promise<void> {
        const newWarranty = await Warranty.create(warranty);

        await User.updateOne(
            { _id: userId },
            { $push: { warrantyIds: newWarranty.id } }
        );
    }

    public async removeWarranty(
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
