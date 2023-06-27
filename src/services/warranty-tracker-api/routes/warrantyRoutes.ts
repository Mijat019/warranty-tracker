import { Router } from "express";
import { warrantyController } from "../controllers/WarrantyController";
import multer from "multer";

const router = Router();

const upload = multer();

router.get("", warrantyController.getAll);
router.post("", warrantyController.createWarranty);
router.delete("/:warrantyId", warrantyController.removeWarranty);
router.post('/:warrantyId/photos', upload.array('photos', 5), warrantyController.uploadImage);

export default router;