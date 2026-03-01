const express = require("express")
const router = express.Router()

const {
  getRudiments,
  createRudiment,
  updateRudiment,
  deleteRudiment,
} = require("../controllers/rudimentController")

router.get("/", getRudiments)
router.post("/", createRudiment)
router.put("/:id", updateRudiment)
router.delete("/:id", deleteRudiment)

module.exports = router