import { Router } from "express";
import { userController } from "../controllers/UserController";

const router = Router()

router.get("", userController.getAllUsers)
router.post("", userController.registerUser)

export default router;