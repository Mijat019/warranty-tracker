import { IUser } from "../models/IUser";
import Warranty, { IWarranty } from "../models/IWarranty";

export class WarrantyRepository {
    public async addWarranty(user: IUser, warranty: IWarranty): Promise<void> {
        const newWarranty = await Warranty.create(warranty);

        user.warrantyIds.push(newWarranty._id);
        await user.save();
    }

    public async removeWarranty(
        user: IUser,
        warrantyId: string
    ): Promise<void> {
        const warrantyIndex = user.warrantyIds.findIndex(
            (warranty) => warranty.toString() === warrantyId
        );

        if (warrantyIndex === -1) {
            throw new Error("Warranty not found");
        }

        user.warrantyIds.splice(warrantyIndex, 1);

        await user.save();
    }
}

export const warrantyRepository = new WarrantyRepository();
