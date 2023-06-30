import { Request, Response } from "express";
import { LabelsService, labelsService } from "../services/LabelsService";

export class LabelsController {
    constructor(private readonly labelsService: LabelsService) { }

    public add = async (req: Request, res: Response) => {
        await this.labelsService.add(req.user.id, req.body.labels);

        res.status(201).json({ status: 201, isSuccess: true })
    }

    public remove = async (req: Request, res: Response) => {
        await this.labelsService.remove(req.user.id, req.body.labels);

        res.status(200).json({ status: 201, isSuccess: true })
    }
}

export const labelsController = new LabelsController(labelsService);