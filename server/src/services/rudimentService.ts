import { IRudiment } from "../models/Rudiment";
import mongoose from "mongoose";
import { 
    findAllRudiments, 
    createRudimentRepo, 
    updateRudimentRepo, 
    deleteRudimentRepo,
    findRudimentByIdRepo } from "../repositories/rudimentRepository";
import { ValidationError, NotFoundError } from "../errors/AppError";


export const getRudimentsService = async (): Promise<IRudiment[]> => {
    return findAllRudiments()
}

export const getRudimentByIdService = async (
    id: string
): Promise<IRudiment> => {
    const rudiment = await findRudimentByIdRepo(id)

    if(!rudiment) {
        throw new NotFoundError("Rudiment not found")
    }

    return rudiment
}

export const createRudimentService = async (
    name: string,
    bpm: number
): Promise<IRudiment> => {

    if(!name || name.trim().length === 0) {
        throw new ValidationError("Rudiment name is required")
    }

    if(bpm < 20 || bpm > 400) {
        throw new ValidationError("Bpm must be between 20 and 400")
    }

    return createRudimentRepo(name, bpm)
}

export const updateRudimentService = async (
    id: string,
    name: string,
    bpm: number
): Promise<IRudiment | null> => {

    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundError("Rudiment not found")
    }

    if(!name || name.trim().length === 0) {
        throw new ValidationError("Rudiment name is required")
    }

    if(bpm < 20 || bpm > 400) {
        throw new ValidationError("Bpm must be between 20 and 400")
    }

    const updated = await updateRudimentRepo(id, name.trim(), bpm)

    if(!updated){
        throw new NotFoundError("Rudiment not found")
    }

    return updated
}

export const deleteRudimentService = async (
    id: string
): Promise<IRudiment | null> => {

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new NotFoundError("Rudiment not found")
    }

    const deleted = await deleteRudimentRepo(id)

    if (!deleted){
        throw new NotFoundError("Rudiment not found")
    }

    return deleted
}