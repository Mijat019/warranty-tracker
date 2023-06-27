import { AppError, HttpCode } from "../errors/AppError";
import { IUser } from "../models/IUser";
import { IWarranty } from "../models/IWarranty";
import { UserRepository } from "../repositories/UserRepository";
import { WarrantyRepository, warrantyRepository } from "../repositories/WarrantyRepository";

export class WarrantyService {
    private readonly warrantyRepository: WarrantyRepository;
    private readonly userRepository: UserRepository;

    constructor(
        warrantyRepository: WarrantyRepository,
        userRepository: UserRepository
    ) {
        this.warrantyRepository = warrantyRepository;
    }

    public async getAll() {
        return await this.warrantyRepository.getAll();
    }

    public async add(userId: string, warranty: IWarranty) {
        const user: IUser | null = await this.userRepository.get(userId);

        if (user == null){
            throw new AppError("User not found", HttpCode.NOT_FOUND, `The user with id ${userId}`)
        }

        warranty.user = userId;

        warranty = await this.warrantyRepository.add(userId, warranty);
    }

    public async remove(userId: string, warrantyId: string) {
        await this.warrantyRepository.remove(userId, warrantyId);
    }
}

export const warrantyService = new WarrantyService(warrantyRepository);
