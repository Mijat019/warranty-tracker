import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../middleware/asyncHandler";
import { authorize } from "../middleware/authorization";
import { warrantyController } from "../controllers/WarrantyController";
import { validateRequest } from "../middleware/validation";
import { createWarrantySchema } from "../schemas/warrantySchemas";

const router = Router();
const upload = multer();

router.use(authorize);

router.get("", asyncHandler(warrantyController.getAll));
router.post("", validateRequest(createWarrantySchema), asyncHandler(warrantyController.createWarranty));
router.delete("/:warrantyId", asyncHandler(warrantyController.removeWarranty));
router.post(
    "/:warrantyId/photos",
    upload.array("photos", 5),
    asyncHandler(warrantyController.uploadImage)
);

export default router;
