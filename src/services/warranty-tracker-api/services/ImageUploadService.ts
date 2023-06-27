import { fileSystemService } from "../infrastructure/FileSystemService";
import * as uuid from "uuid";
import { Warranty } from "../models/IWarranty";
import { AppError, HttpCode } from "../errors/AppError";

export class ImageUploadService {
    private readonly allowedExtensions = ["png", "jpeg", "jpg"]

    constructor() { }

    public async saveImages(files: any, warrantyId: string): Promise<string[]> {
        const successfulUploads: string[] = []
        const failedFiles: string[] = []

        for (const file of files) {
            const fileExtension: string = file.mimetype.split("/")[1];

            if (this.allowedExtensions.indexOf(fileExtension) === -1) {
                throw new AppError("Unsupported file extension.", HttpCode.BAD_REQUEST, `Extension ${fileExtension} is not supported.`);
            }

            const name = `${uuid.v4()}.${fileExtension}`;

            try {
                await fileSystemService.saveImages(file, name);
                successfulUploads.push(name);
            } catch (err) {
                failedFiles.push(name);
                console.log(err)
            }
        }

        await Warranty.updateOne({ _id: warrantyId }, { $push: { imageNames: { $each: successfulUploads } } })

        return failedFiles;
    }
}

export const imageUploadService = new ImageUploadService();