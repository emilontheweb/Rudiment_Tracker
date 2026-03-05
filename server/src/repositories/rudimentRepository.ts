import Rudiment, { IRudiment } from "../models/Rudiment";

export const findAllRudiments = async (): Promise<IRudiment[]> => {
    return Rudiment.find().sort({ createdAt: -1})
}

export const findRudimentByIdRepo = async (
    id: string
): Promise<IRudiment | null> => {
    return Rudiment.findById(id)
}

export const createRudimentRepo = async (
    name: string,
    bpm: number
): Promise<IRudiment> => {
    const newRudiment = new Rudiment({ name, bpm })
    return newRudiment.save()
}

export const updateRudimentRepo = async (
    id: string,
    name: string,
    bpm: number
): Promise<IRudiment | null> => {
    return Rudiment.findByIdAndUpdate(
        id,
        {name, bpm},
        {returnDocument: "after", runValidators: true }
    )
}

export const deleteRudimentRepo = async (
    id: string
): Promise<IRudiment | null> => {
    return Rudiment.findByIdAndDelete(id)
}