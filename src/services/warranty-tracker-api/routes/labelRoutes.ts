import { Router } from "express";
import { authorize } from "../middleware/authorization";
import { validateRequest } from "../middleware/validation";
import { labelsController } from "../controllers/LabelsController";
import { addLabelsSchema, removeLabelsSchema } from "../schemas/labelSchema";
import { asyncHandler } from "../middleware/asyncHandler";

const labelRoutes = Router()

labelRoutes.use(authorize);

labelRoutes.post("", validateRequest(addLabelsSchema), asyncHandler(labelsController.add))
labelRoutes.delete("", validateRequest(removeLabelsSchema), asyncHandler(labelsController.remove))

export default labelRoutes;



