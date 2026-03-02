import { Request, Response } from "express"
import Rudiment from "../models/Rudiment"

export const getRudiments = async (req: Request, res: Response) => {
  const rudiments = await Rudiment.find().sort({ createdAt: -1 })
  res.json(rudiments) 
}

export const createRudiment = async (req: Request, res: Response) => {
  const { name, bpm } = req.body;

  const newRudiment = new Rudiment({ name, bpm });
  const saved = await newRudiment.save();

  res.status(201).json(saved);
};

export const updateRudiment = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, bpm } = req.body

  const updated = await Rudiment.findByIdAndUpdate(
    id,
    { name, bpm },
    { returnDocument: "after", runValidators: true}
  )

  res.json(updated)
}

export const deleteRudiment = async (req: Request, res: Response) => {
  const { id } = req.params
  await Rudiment.findByIdAndDelete(id)

  res.json({ message: "Rudiment deleted" })
}