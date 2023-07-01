import { Router } from "express";
import { userController } from "../controllers/UserController";
import { asyncHandler } from "../middleware/asyncHandler";
import { authorize } from "../middleware/authorization";

const router = Router();

router.use(authorize);

router.get("/", asyncHandler(userController.getAllUsers));

export default router;
