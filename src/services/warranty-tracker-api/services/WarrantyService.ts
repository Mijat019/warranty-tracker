import { IUser } from "../models/IUser";
import { IWarranty } from "../models/IWarranty";
import { UserRepository, userRepository } from "../repositories/UserRepository";
import { WarrantyRepository, warrantyRepository } from "../repositories/WarrantyRepository";

export class WarrantyService {
    private readonly userRepository: UserRepository;
    private readonly warrantyRepository: WarrantyRepository;

    constructor(
        userRepository: UserRepository,
        warrantyRepository: WarrantyRepository
    ) {
        this.userRepository = userRepository;
        this.warrantyRepository = warrantyRepository;
    }

    public async addWarranty(userId: string, warranty: IWarranty) {
        warranty.user = userId;

        const user: IUser | null = await this.userRepository.getUser(userId);

        console.log(user);

        if (user == null) {
            throw new Error("Jebo mamu");
        }

        await this.warrantyRepository.addWarranty(user, warranty);
    }

    public async removeWarranty(userId: string, warrantyId: string) {
        const user: IUser | null = await this.userRepository.getUser(userId);

        if (user == null) {
            throw new Error("Jebo mamu");
        }

        await this.warrantyRepository.removeWarranty(user, warrantyId);
    }
}

export const warrantyService = new WarrantyService(userRepository, warrantyRepository);
