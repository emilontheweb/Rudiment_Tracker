import { Router } from "express"

import {
  getRudiments,
  createRudiment,
  updateRudiment,
  deleteRudiment,
} from "../controllers/rudimentController"

const router = Router()

router.get("/", getRudiments)
router.post("/", createRudiment)
router.put("/:id", updateRudiment)
router.delete("/:id", deleteRudiment)

export default router