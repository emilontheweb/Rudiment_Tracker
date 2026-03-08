import { Router } from "express"
import * as controller from "../controllers/sessionController"
import { validate } from "../middleware/validate"
import { createSessionSchema } from "../validation/sessionValidation"
import { sessionQuerySchema } from "../validation/sessionQueryValidation"

const router = Router()

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get practice sessions
 *     description: Returns a paginated list of practice sessions
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: rudimentId
 *         schema:
 *           type: string
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PracticeSession'
 *                 page:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 total:
 *                   type: number
 *                 pages:
 *                   type: number
 *             example:
 *               data:
 *                 - _id: "65f3b1f9a12e4c0d9d123456"
 *                   rudimentId: "65f3a9b3e1c23d1a98a12345"
 *                   bpm: 120
 *                   durationInMinutes: 15
 *                   notes: "Felt smooth today"
 *                   createdAt: "2026-03-07T14:30:00.000Z"
 *               page: 1
 *               limit: 10
 *               total: 1
 *               pages: 1
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
router.get("/", validate(sessionQuerySchema, "query"), controller.getSessions)

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Create a practice session
 *     description: Logs a new rudiment practice session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rudimentId
 *               - bpm
 *               - durationInMinutes
 *             properties:
 *               rudimentId:
 *                 type: string
 *               bpm:
 *                 type: number
 *               durationInMinutes:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PracticeSession'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validate(createSessionSchema), controller.createSession)

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get a practice session by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PracticeSession'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */
router.get("/:id", controller.getSessionById)

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     tags:
 *       - Sessions
 *     summary: Delete a practice session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Session deleted
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", controller.deleteSession)

export default router