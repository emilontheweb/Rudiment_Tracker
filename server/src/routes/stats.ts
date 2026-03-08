import { Router } from "express"
import * as controller from "../controllers/statsController"

const router = Router()

/**
 * @swagger
 * /api/stats/weekly-practice:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get weekly practice time
 *     responses:
 *       200:
 *         description: Weekly practice statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   week:
 *                     type: string
 *                   totalMinutes:
 *                     type: number
 *             example:
 *               - week: "2026-W09"
 *                 totalMinutes: 90
 *               - week: "2026-W10"
 *                 totalMinutes: 120
 *       500:
 *         description: Server error
 */
router.get("/weekly-practice", controller.getWeeklyPractice)

/**
 * @swagger
 * /api/stats/bpm-progression:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get BPM progression for a rudiment
 *     parameters:
 *       - in: query
 *         name: rudimentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: BPM progression data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                   avgBpm:
 *                     type: number
 *             example:
 *               - date: "2026-03-01"
 *                 avgBpm: 110
 *               - date: "2026-03-04"
 *                 avgBpm: 120
 *               - date: "2026-03-07"
 *                 avgBpm: 130
 *       400:
 *         description: Invalid rudimentId
 *       500:
 *         description: Server error
 */
router.get("/bpm-progression", controller.getBpmProgression)

/**
 * @swagger
 * /api/stats/practice-streak:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get practice streak
 *     responses:
 *       200:
 *         description: Practice streak statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentStreak:
 *                   type: number
 *                 longestStreak:
 *                   type: number
 *             example:
 *               currentStreak: 4
 *               longestStreak: 9
 *       500:
 *         description: Server error
 */
router.get("/practice-streak", controller.getPracticeStreak)

/**
 * @swagger
 * /api/stats/summary:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get summary statistics
 *     responses:
 *       200:
 *         description: Summary statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SummaryStats'
 *             example:
 *               totalSessions: 25
 *               totalPracticeMinutes: 640
 *               averageBpm: 118
 *       500:
 *         description: Server error
 */
router.get("/summary", controller.getSummaryStats)

export default router