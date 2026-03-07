import mongoose from "mongoose";
import * as repo from "../repositories/sessionRepository"
import { NotFoundError, ValidationError } from "../errors/AppError";

export const createSession = async (data: any) => {
    if (!mongoose.Types.ObjectId.isValid(data.rudimentId)) {
        throw new ValidationError("Invalid rudimentId")
    }

    return repo.createSession(data)
}

export const getSessions = async (page: number, limit: number) => {
    const skip = (page - 1) * limit

    const sessions = await repo.getSession(skip, limit)
    const total = await repo.countSessions()

    return {
        data: sessions,
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
    }
}

export const getSessionById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid id")
    }

    const session = await repo.getSessionById(id)

    if (!session) {
        throw new NotFoundError("Session not found")
    }

    return session
}

export const deleteSession = async (id: string) => {
    const session = await repo.deleteSession(id)

    if (!session) {
        throw new NotFoundError("Session not found")
    }

    return session
}
