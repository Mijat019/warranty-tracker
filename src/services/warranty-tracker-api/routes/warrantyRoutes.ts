import { Router } from "express";
import { warrantyController } from "../controllers/WarrantyController";
import multer from "multer";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

const upload = multer();

router.get("", asyncHandler(warrantyController.getAll));
router.post("", asyncHandler(warrantyController.createWarranty));
router.delete("/:warrantyId", asyncHandler(warrantyController.removeWarranty));
router.post(
    "/:warrantyId/photos",
    upload.array("photos", 5),
    asyncHandler(warrantyController.uploadImage)
);

export default router;
