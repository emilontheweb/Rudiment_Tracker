import { Router } from "express"

import {
  getRudiments,
  createRudiment,
  updateRudiment,
  deleteRudiment,
  getRudimentById
} from "../controllers/rudimentController"

const router = Router()

router.get("/", getRudiments)
router.get("/:id", getRudimentById)
router.post("/", createRudiment)
router.put("/:id", updateRudiment)
router.delete("/:id", deleteRudiment)

export default router