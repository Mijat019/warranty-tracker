import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import { asyncHandler } from "../middleware/asyncHandler";
import { authController } from "../controllers/AuthController";
import { loginSchema, registerSchema } from "../schemas/userSchema";

const router = Router({ mergeParams: true });

router.post(
    "/login",
    validateRequest(loginSchema),
    asyncHandler(authController.login)
);
router.post(
    "/register",
    validateRequest(registerSchema),
    asyncHandler(authController.registerUser)
);

export default router;
