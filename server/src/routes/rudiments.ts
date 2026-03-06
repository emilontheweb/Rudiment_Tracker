import { Router } from "express"

import {
  getRudiments,
  createRudiment,
  updateRudiment,
  deleteRudiment,
  getRudimentById
} from "../controllers/rudimentController"

import { validate } from "../middleware/validate"
import {
  createRudimentSchema,
  updateRudimentSchema,
} from "../validation/rudimentValidation"

const router = Router()

router.get("/", getRudiments)
router.get("/:id", getRudimentById)

router.post("/",
  validate(createRudimentSchema),
   createRudiment
)

router.put("/:id",
  validate(updateRudimentSchema),
   updateRudiment
)
router.delete("/:id", deleteRudiment)

export default router