import { Request, Response } from "express"
import { 
  createRudimentService,
  getRudimentsService,
  updateRudimentService,
  deleteRudimentService,
  getRudimentByIdService} from "../services/rudimentService"
import { NextFunction } from "express-serve-static-core"
import { asyncHandler } from "../utils/asyncHandler"


export const getRudiments = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { page, limit, minBpm, maxBpm, search } = req.query 
  const rudiments = await getRudimentsService({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    minBpm: minBpm ? Number(minBpm) : undefined,
    maxBpm: maxBpm ? Number(maxBpm) : undefined,
    search: search ? String(search) : undefined
  })

  res.json(rudiments)
})

export const getRudimentById = asyncHandler(async (
  req: Request<{id: string}>,
  res: Response,
) => {
    const { id } = req.params
    const rudiment = await getRudimentByIdService(id)
    res.json(rudiment)
})

export const createRudiment = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { name, bpm } = req.body;
  const saved = await createRudimentService(name, bpm);
  res.status(201).json(saved);
})

export const updateRudiment = asyncHandler(async (
  req: Request<{id: string}>,
  res: Response,
) => {
  const { id } = req.params
  const { name, bpm } = req.body
  const updated = await updateRudimentService(id, name, bpm)
  res.json(updated)
})

export const deleteRudiment = asyncHandler(async (
  req: Request<{id: string}>,
  res: Response,
) => {
  const { id } = req.params
  await deleteRudimentService(id)
  res.json({ message: "Rudiment deleted" })
})