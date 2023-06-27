import fs from "fs/promises"

export class FileSystemService {
    private readonly fileUploadPath = "public/uploads"

    public async saveImages(file: any, fileNameAndExtension: string) {
        await fs.writeFile(`${this.fileUploadPath}/${fileNameAndExtension}`, file.buffer);
    }
}

export const fileSystemService = new FileSystemService();