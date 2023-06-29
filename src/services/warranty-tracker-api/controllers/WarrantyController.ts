import { Request, Response } from "express";
import { WarrantyService, warrantyService } from "../services/WarrantyService";
import {
    ImageUploadService,
    imageUploadService,
} from "../services/ImageUploadService";
import { WarrantyResponse } from "../responses/WarrantyResponse";
import { AppError, HttpCode } from "../errors/AppError";

export class WarrantyController {
    constructor(
        private readonly warrantyService: WarrantyService,
        private readonly imageUploadService: ImageUploadService
    ) { }

    public getAll = async (
        req: Request,
        res: Response
    ) => {
        const warranties = await this.warrantyService.getAll();

        const warrantiesResponse: WarrantyResponse[] = warranties.map((warranty: WarrantyResponse) => ({
            productName: warranty.productName,
            labels: warranty.labels,
            startDate: warranty.startDate,
            endDate: warranty.endDate,
            user: warranty.user,
            imageNames: warranty.imageNames,
        }));

        res.json({ status: 200, isSuccess: true, warranties: warrantiesResponse });
    };

    public getWarrantiesForUser = async (req: Request, res: Response) => {
        const warranties = await this.warrantyService.getAllForUser(req.user.id);

        const warrantiesResponse: WarrantyResponse[] = warranties.map((warranty: WarrantyResponse) => ({
            productName: warranty.productName,
            labels: warranty.labels,
            startDate: warranty.startDate,
            endDate: warranty.endDate,
            user: warranty.user,
            imageNames: warranty.imageNames,
        }));

        res.json({ status: 200, isSuccess: true, warranties: warrantiesResponse });
    }

    public createWarranty = async (
        req: Request,
        res: Response
    ) => {
        const warranty = await this.warrantyService.add(req.user.id, req.body);

        const warrantyResponse: WarrantyResponse = {
            productName: warranty.productName,
            labels: warranty.labels,
            startDate: warranty.startDate,
            endDate: warranty.endDate,
            user: warranty.user,
            imageNames: warranty.imageNames,
        }

        res.json({ status: 201, isSuccess: true, warranty: warrantyResponse });
    };

    public removeWarranty = async (
        request: Request,
        response: Response
    ) => {
        const { userId } = request.body;
        const { warrantyId } = request.params;

        await this.warrantyService.remove(userId, warrantyId as string);

        response.json({ status: 200, isSuccess: true });
    };

    public uploadImage = async (
        request: Request,
        response: Response
    ) => {
        const { warrantyId } = request.params;

        await this.imageUploadService.saveImages(request.files, warrantyId);

        response.json({ status: 200, isSuccess: true });
    };
}

export const warrantyController = new WarrantyController(
    warrantyService,
    imageUploadService
);
