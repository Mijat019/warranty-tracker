import { Router } from "express";
import { UserController, userController } from "../controllers/UserController";
import {
    ErrorController,
    errorController,
} from "../controllers/ErrorController";
import { loginSchema, registerSchema } from "../schemas/userSchema";
import { asyncHandler } from "../middleware/asyncHandler";
import { authorize } from "../middleware/authorization";
import { validateRequest } from "./validation";

const router = Router();

// public endpoints

router.post(
    "/login",
    validateRequest(loginSchema),
    asyncHandler(userController.login)
);
router.post(
    "",
    validateRequest(registerSchema),
    asyncHandler(userController.registerUser)
);

// protected endpoints

router.use(authorize);

router.get("", asyncHandler(userController.getAllUsers));

export default router;
