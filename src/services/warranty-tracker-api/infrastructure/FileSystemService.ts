import fs from "fs/promises";

export class FileSystemService {
    private readonly fileUploadPath = "public/uploads";

    public saveImage = async (
        file: any,
        fileNameAndExtension: string
    ): Promise<void> => {
        await fs.writeFile(
            `${this.fileUploadPath}/${fileNameAndExtension}`,
            file.buffer
        );
    };

    public deleteImage = async (
        fileNameAndExtension: string
    ): Promise<void> => {
        await fs.unlink(`${this.fileUploadPath}/${fileNameAndExtension}`);
    };
}

export const fileSystemService = new FileSystemService();
