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
import { rudimentQuerySchema } from "../validation/rudimentQueryValidation"
import { authMiddleware } from "../middleware/auth"

const router = Router()
router.use(authMiddleware)

/**
 * @swagger
 * /api/rudiments:
 *   get:
 *     tags:
 *       - Rudiments
 *     summary: Get all rudiments
 *     description: Returns a paginated list of rudiments
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Paginated list of rudiments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rudiment'
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
 *                 - _id: "65f3a9b3e1c23d1a98a12345"
 *                   name: "Paradiddle"
 *                   bpm: 120
 *                   createdAt: "2026-03-01T12:00:00.000Z"
 *                   updatedAt: "2026-03-01T12:00:00.000Z"
 *               page: 1
 *               limit: 10
 *               total: 1
 *               pages: 1
 */
router.get(
  "/",
  validate(rudimentQuerySchema, "query"),
  getRudiments
)

/**
 * @swagger
 * /api/rudiments/{id}:
 *   get:
 *     tags:
 *       - Rudiments
 *     summary: Get a rudiment by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rudiment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rudiment'
 *       404:
 *         description: Rudiment not found
 */
router.get("/:id", getRudimentById)

/**
 * @swagger
 * /api/rudiments:
 *   post:
 *     tags:
 *       - Rudiments
 *     summary: Create a new rudiment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - bpm
 *             properties:
 *               name:
 *                 type: string
 *               bpm:
 *                 type: number
 *     responses:
 *       201:
 *         description: Rudiment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rudiment'
 */
router.post(
  "/",
  validate(createRudimentSchema),
  createRudiment
)

/**
 * @swagger
 * /api/rudiments/{id}:
 *   put:
 *     tags:
 *       - Rudiments
 *     summary: Update a rudiment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bpm:
 *                 type: number
 *     responses:
 *       200:
 *         description: Rudiment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rudiment'
 *       404:
 *         description: Rudiment not found
 */
router.put(
  "/:id",
  validate(updateRudimentSchema),
  updateRudiment
)

/**
 * @swagger
 * /api/rudiments/{id}:
 *   delete:
 *     tags:
 *       - Rudiments
 *     summary: Delete a rudiment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Rudiment deleted
 *       404:
 *         description: Rudiment not found
 */
router.delete("/:id", deleteRudiment)

export default router