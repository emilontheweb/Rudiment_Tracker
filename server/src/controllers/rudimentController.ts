import { Request, Response } from "express"
import { 
  createRudimentService,
  getRudimentsService,
  updateRudimentService,
  deleteRudimentService,
  getRudimentByIdService} from "../services/rudimentService"
import { NextFunction } from "express-serve-static-core"


export const getRudiments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const { name, bpm } = req.body;
  const saved = await getRudimentsService();
  res.status(201).json(saved);
  } catch (err) {
    next(err)
  }
}

export const getRudimentById = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const rudiment = await getRudimentByIdService(id)
    res.json(rudiment)
  } catch (err) {
    next(err)
  }
}

export const createRudiment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
  const { name, bpm } = req.body;
  const saved = await createRudimentService(name, bpm);
  res.status(201).json(saved);
  } catch (err) {
    next(err)
  }
}

export const updateRudiment = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
  const { id } = req.params
  const { name, bpm } = req.body
  const updated = await updateRudimentService(id, name, bpm)
  res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const deleteRudiment = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
  const { id } = req.params
  await deleteRudimentService(id)
  res.json({ message: "Rudiment deleted" })
  } catch (err) {
    next(err)
  }
}