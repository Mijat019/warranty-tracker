import { AppError, HttpCode } from "../errors/AppError";
import { IUser } from "../models/IUser";
import { IWarranty } from "../models/IWarranty";
import { UserRepository, userRepository } from "../repositories/UserRepository";
import {
    WarrantyRepository,
    warrantyRepository,
} from "../repositories/WarrantyRepository";
import { ImageUploadService, imageUploadService } from "./ImageUploadService";

export class WarrantyService {
    private readonly warrantyRepository: WarrantyRepository;
    private readonly userRepository: UserRepository;
    private readonly imageUploadService: ImageUploadService;

    constructor(
        warrantyRepository: WarrantyRepository,
        userRepository: UserRepository,
        imageUploadService: ImageUploadService
    ) {
        this.warrantyRepository = warrantyRepository;
        this.userRepository = userRepository;    
        this.imageUploadService = imageUploadService;
    }

    public async getAll() {
        return await this.warrantyRepository.getAll();
    }

    public async add(userId: string, warranty: IWarranty) {
        const user: IUser | null = await this.userRepository.get(userId);

        if (user == null) {
            throw new AppError(
                "User not found",
                HttpCode.NOT_FOUND,
                `The user with id ${userId}`
            );
        }

        warranty.user = userId;

        warranty = await this.warrantyRepository.add(userId, warranty);
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

export const warrantyService = new WarrantyService(
    warrantyRepository,
    userRepository,
    imageUploadService,
);
