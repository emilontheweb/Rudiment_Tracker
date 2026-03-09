import { IRudiment } from "../models/Rudiment";
import mongoose, { Types } from "mongoose";
import { 
    findAllRudiments, 
    createRudimentRepo, 
    updateRudimentRepo, 
    deleteRudimentRepo,
    findRudimentByIdRepo } from "../repositories/rudimentRepository";
import { ValidationError, NotFoundError } from "../errors/AppError";

interface RudimentQuery {
    page: number
    limit: number
    minBpm?: number
    maxBpm?: number
    search?: string
    userId?: Types.ObjectId | string
}


export const getRudimentsService = async (
    query: RudimentQuery
) => {
    return findAllRudiments(query)
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
    bpm: number,
    userId?: Types.ObjectId | string
): Promise<IRudiment> => {

    if(!name || name.trim().length === 0) {
        throw new ValidationError("Rudiment name is required")
    }

    if(bpm < 20 || bpm > 400) {
        throw new ValidationError("Bpm must be between 20 and 400")
    }

    return createRudimentRepo(name.trim(), bpm, userId)
}

export const updateRudimentService = async (
    id: string,
    name: string,
    bpm: number,
    userId?: Types.ObjectId | string
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

    const updated = await updateRudimentRepo(id, name.trim(), bpm, userId)

    if(!updated){
        throw new NotFoundError("Rudiment not found")
    }

    return updated
}

export const deleteRudimentService = async (
    id: string,
    userId?: Types.ObjectId | string
): Promise<IRudiment | null> => {

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new NotFoundError("Rudiment not found")
    }

    const deleted = await deleteRudimentRepo(id, userId)

    if (!deleted){
        throw new NotFoundError("Rudiment not found")
    }

    return deleted
}