import { Router } from "express";
import * as controller from "../controllers/statsController"

const router = Router()

router.get("/weekly-practice", controller.getWeeklyPractice)
router.get("/bpm-progression", controller.getBpmProgression)
router.get("/practice-streak", controller.getPracticeStreak)
router.get("/summary", controller.getSummaryStats)

export default router