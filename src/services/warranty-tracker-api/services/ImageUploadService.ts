import {
    FileSystemService,
    fileSystemService,
} from "../infrastructure/FileSystemService";
import * as uuid from "uuid";
import { IWarranty, Warranty } from "../models/IWarranty";
import { AppError, HttpCode } from "../errors/AppError";
import {
    WarrantyRepository,
    warrantyRepository,
} from "../repositories/WarrantyRepository";

export class ImageUploadService {
    private readonly allowedExtensions = ["png", "jpeg", "jpg"];

    private readonly fileSystemService: FileSystemService;
    private readonly warrantyRepository: WarrantyRepository;

    constructor(
        warrantyRepository: WarrantyRepository,
        fileSystemService: FileSystemService
    ) {
        this.warrantyRepository = warrantyRepository;
        this.fileSystemService = fileSystemService;
    }

    public saveImages = async (
        files: any,
        warrantyId: string
    ): Promise<string[]> => {
        const warranty: IWarranty | null =
            await this.warrantyRepository.getById(warrantyId);

        if (!warranty) {
            throw new AppError(
                "Warranty doesn't exist.",
                HttpCode.NOT_FOUND,
                ""
            );
        }

        const successfulUploads: string[] = [];
        const failedFiles: string[] = [];

        for (const file of files) {
            const fileExtension: string = file.mimetype.split("/")[1];

            if (this.allowedExtensions.indexOf(fileExtension) === -1) {
                throw new AppError(
                    "Unsupported file extension.",
                    HttpCode.BAD_REQUEST,
                    `Extension ${fileExtension} is not supported.`
                );
            }

            const fileNameAndExtension = `${uuid.v4()}.${fileExtension}`;

            try {
                await this.fileSystemService.saveImage(
                    file,
                    fileNameAndExtension
                );
                successfulUploads.push(fileNameAndExtension);
            } catch (err) {
                failedFiles.push(fileNameAndExtension);
                console.log(err);
            }
        }

        await Warranty.updateOne(
            { _id: warrantyId },
            { $push: { imageNames: { $each: successfulUploads } } }
        );

        return failedFiles;
    };

    public removeImages = async (imageNames: string[]): Promise<void> => {
        const promises = imageNames.map(this.fileSystemService.deleteImage);
        await Promise.all(promises);
    };
}

export const imageUploadService = new ImageUploadService(
    warrantyRepository,
    fileSystemService
);
