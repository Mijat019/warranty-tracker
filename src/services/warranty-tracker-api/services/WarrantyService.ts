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

        await this.warrantyRepository.addWarranty(userId, warranty);
    }

    public async removeWarranty(userId: string, warrantyId: string) {
        await this.warrantyRepository.removeWarranty(userId, warrantyId);
    }
}

export const warrantyService = new WarrantyService(userRepository, warrantyRepository);
