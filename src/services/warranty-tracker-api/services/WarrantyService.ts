import { AppError, HttpCode } from "../errors/AppError";
import { IUser } from "../models/IUser";
import { IWarranty } from "../models/IWarranty";
import { UserRepository, userRepository } from "../repositories/UserRepository";
import { WarrantyRepository, warrantyRepository } from "../repositories/WarrantyRepository";
import { ImageUploadService, imageUploadService } from "./ImageUploadService";
import { UserService, userService } from "./UserService";

export class WarrantyService {
    constructor(
        private readonly warrantyRepository: WarrantyRepository,
        private readonly userRepository: UserRepository,
        private readonly imageUploadService: ImageUploadService,
        private readonly userService: UserService
    ) { }

    public async getAll() {
        return await this.warrantyRepository.getAll();
    }

    public getAllForUser = async (userId: string): Promise<IWarranty[]> => {
        await this.userService.checkIfUserExists(userId);

        return await this.warrantyRepository.getAll({ userId })
    }

    public async add(userId: string, warranty: IWarranty): Promise<IWarranty> {
        const user: IUser | null = await this.userRepository.getById(userId);

        if (user == null) {
            throw new AppError(
                "User not found",
                HttpCode.NOT_FOUND,
                `The user with id ${userId}`
            );
        }

        warranty.user = userId;

        warranty = await this.warrantyRepository.add(userId, warranty);

        return warranty;
    }

    public async remove(userId: string, warrantyId: string) {
        const warranty: IWarranty | null =
            await this.warrantyRepository.getById(warrantyId);

        if (!warranty) {
            throw new AppError(
                "Warranty doesn't exist.",
                HttpCode.NOT_FOUND,
                ""
            );
        }

        await this.imageUploadService.removeImages(warranty.imageNames);
        await this.warrantyRepository.remove(userId, warrantyId);
    }
}

export const warrantyService = new WarrantyService(warrantyRepository, userRepository, imageUploadService, userService);