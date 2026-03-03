import { IRudiment } from "../models/Rudiment";
import { 
    findAllRudiments, 
    createRudimentRepo, 
    updateRudimentRepo, 
    deleteRudimentRepo } from "../repositories/rudimentRepository";


export const getRudimentsService = async (): Promise<IRudiment[]> => {
    return findAllRudiments()
}

export const createRudimentService = async (
    name: string,
    bpm: number
): Promise<IRudiment> => {
    return createRudimentRepo(name, bpm)
}

export const updateRudimentService = async (
    id: string,
    name: string,
    bpm: number
): Promise<IRudiment | null> => {
    return updateRudimentRepo(id, name, bpm)
}

export const deleteRudimentService = async (
    id: string
): Promise<IRudiment | null> => {
    return deleteRudimentRepo(id)
}