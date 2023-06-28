import { Router } from "express";
import { userController } from "../controllers/UserController";
import { errorController } from "../controllers/ErrorController";
import { registerSchema } from "../schemas/userSchema";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get("", asyncHandler(userController.getAllUsers));
router.post(
    "",
    errorController.validateRequest(registerSchema),
    asyncHandler(userController.registerUser)
);

export default router;
