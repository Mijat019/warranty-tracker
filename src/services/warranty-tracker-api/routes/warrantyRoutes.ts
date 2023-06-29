import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { authorize } from "../middleware/authorization";
import { warrantyController } from "../controllers/WarrantyController";

const router = Router();

router.use(authorize);

router.get("", asyncHandler(warrantyController.getAll));

export default router;
