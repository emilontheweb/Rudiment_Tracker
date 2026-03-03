import { Request, Response } from "express"
import { 
  createRudimentService,
  getRudimentsService,
  updateRudimentService,
  deleteRudimentService } from "../services/rudimentService"

export const getRudiments = async (req: Request, res: Response) => {
  const rudiments = await getRudimentsService()
  res.json(rudiments) 
}

export const createRudiment = async (req: Request, res: Response) => {
  const { name, bpm } = req.body;

  const saved = await createRudimentService(name, bpm);

  res.status(201).json(saved);
};

export const updateRudiment = async (req: Request<{id: string}>, res: Response) => {
  const { id } = req.params
  const { name, bpm } = req.body

  const updated = await updateRudimentService(id, name, bpm)

  res.json(updated)
}

export const deleteRudiment = async (req: Request<{id: string}>, res: Response) => {
  const { id } = req.params
  await deleteRudimentService(id)

  res.json({ message: "Rudiment deleted" })
}