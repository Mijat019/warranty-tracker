import { Router } from "express";
import { userController } from "../controllers/UserController";
import { loginSchema, registerSchema } from "../schemas/userSchema";
import { asyncHandler } from "../middleware/asyncHandler";
import { authorize } from "../middleware/authorization";
import { validateRequest } from "../middleware/validation";
import { warrantyController } from "../controllers/WarrantyController";

const router = Router();

// public endpoints

router.post(
    "/login",
    validateRequest(loginSchema),
    asyncHandler(userController.login)
);
router.post(
    "/",
    validateRequest(registerSchema),
    asyncHandler(userController.registerUser)
);

// protected endpoints

router.use(authorize);

router.get("/", asyncHandler(userController.getAllUsers));

export default router;
