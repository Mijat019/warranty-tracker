import { Router } from "express";
import { warrantyController } from "../controllers/WarrantyController";

const router = Router()

router.post("", warrantyController.createWarranty)
router.delete("/:warrantyId", warrantyController.removeWarranty)

export default router;