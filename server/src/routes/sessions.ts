import { Router } from "express";
import * as controller from "../controllers/sessionController"
import { validate } from "../middleware/validate"
import { createSessionSchema } from "../validation/sessionValidation"
import { sessionQuerySchema } from "../validation/sessionQueryValidation"

const router = Router()

router.post("/", validate(createSessionSchema), controller.createSession)
router.get("/", controller.getSessions)
router.get("/:id", controller.getSessionById)
router.get("/", validate(sessionQuerySchema, "query"), controller.getSessions)
router.delete("/:id", controller.deleteSession)

export default router