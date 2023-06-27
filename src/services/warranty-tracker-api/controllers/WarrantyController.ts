import { Request, Response } from "express";
import { WarrantyService, warrantyService } from "../services/WarrantyService";
import { imageUploadService } from "../services/ImageUploadService";
import { IWarranty } from "../models/IWarranty";

export class WarrantyController {
    private readonly warrantyService: WarrantyService;

    constructor(warrantyService: WarrantyService) {
        this.warrantyService = warrantyService;
    }

    public getAll = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        const warranties = await this.warrantyService.getAll();

        response.json({ status: 200, success: true, warranties });
    }


    public createWarranty = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        let { userId, warranty } = request.body;

        warranty = await this.warrantyService.add(userId, warranty);

        response.json({ status: 201, success: true, warranty });
    }

    public removeWarranty = async (request: Request, response: Response): Promise<void> => {
        const { userId } = request.body;
        const { warrantyId } = request.params;

        if (!warrantyId) {
            response.json({ status: 400, success: false });
            return;
        }

        await this.warrantyService.remove(
            userId,
            warrantyId as string
        );

        response.json({ status: 200, success: true });
    }

    public uploadImage = async (request: Request, response: Response): Promise<void> => {
        const { warrantyId } = request.params;

        await imageUploadService.saveImages(request.files, warrantyId);

        response.json({ status: 200, isSuccess: true })
    }
}

export const warrantyController = new WarrantyController(warrantyService);