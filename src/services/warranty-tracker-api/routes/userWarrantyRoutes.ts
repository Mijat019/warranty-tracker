import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../middleware/asyncHandler";
import { authorize } from "../middleware/authorization";
import { warrantyController } from "../controllers/WarrantyController";
import { validateRequest } from "../middleware/validation";
import { createWarrantySchema } from "../schemas/warrantySchemas";
import { routeParamGuard } from "../middleware/routeParamGuard";

const router = Router({ mergeParams: true });
const upload = multer();

router.use(authorize);
router.use(routeParamGuard)

router.get("", asyncHandler(warrantyController.getWarrantiesForUser))
router.post("", validateRequest(createWarrantySchema), asyncHandler(warrantyController.createWarranty));
router.delete("/:warrantyId", asyncHandler(warrantyController.removeWarranty));
router.post(
    "/:warrantyId/photos",
    upload.array("photos", 5),
    asyncHandler(warrantyController.uploadImage)
);

export default router;
