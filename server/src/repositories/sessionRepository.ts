import mongoose from "mongoose"
import { PracticeSession, PracticeSessionDocument } from "../models/PracticeSession"

export const createSession = async (data: Partial<PracticeSessionDocument>) => {

    const session = new PracticeSession(data)

    return session.save()
}

export const getSession = async (
    filter: mongoose.QueryFilter<PracticeSessionDocument>,
    skip: number,
    limit: number
) => {
    return PracticeSession
        .find(filter)
        .populate("rudimentId")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
}

export const getSessionById = async (id: string) => {
    return PracticeSession.findById(id).populate("rudimentId")
}

export const deleteSession = async (id: string) => {
    return PracticeSession.findByIdAndDelete(id)
}

export const countSessions = async (
    filters: mongoose.QueryFilter<PracticeSessionDocument>) => {
        
    return PracticeSession.countDocuments(filters)
}