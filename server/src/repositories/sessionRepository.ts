import { PracticeSession } from "../models/PracticeSession";

export const createSession = async (data: any) => {
    return PracticeSession.create(data)
}

export const getSession = async (
    filters: any,
    skip: number,
    limit: number
) => {
    return PracticeSession.find(filters)
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

export const countSessions = async (filters: any) => {
    return PracticeSession.countDocuments(filters)
}