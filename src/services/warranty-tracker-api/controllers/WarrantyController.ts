import { Request, Response } from "express";
import { WarrantyService, warrantyService } from "../services/WarrantyService";

export class WarrantyController {
    private readonly warrantyService: WarrantyService;

    constructor(warrantyService: WarrantyService) {
        this.warrantyService = warrantyService;
    }

    public async createWarranty(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const { userId, warranty } = request.body;

            await this.warrantyService.addWarranty(userId, warranty);

            response.json({ status: 201, success: true });
        } catch (err) {
            response.json({ status: 500, success: false, err });
        }
    }

    public async removeWarranty(request: Request, response: Response) {
        try {
            const { userId } = request.body;
            const { warrantyId } = request.params;

            if (!warrantyId) {
                return response.json({ status: 400, success: false });
            }

            await this.warrantyService.removeWarranty(
                userId,
                warrantyId as string
            );

            response.json({ status: 200, success: true });
        } catch (err) {
            response.json({ status: 500, success: false, err });
        }
    }
}

export const warrantyController = new WarrantyController(warrantyService);