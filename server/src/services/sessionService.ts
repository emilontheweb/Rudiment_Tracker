import mongoose from "mongoose";
import * as repo from "../repositories/sessionRepository"
import { NotFoundError, ValidationError } from "../errors/AppError";

export const createSession = async (data: any) => {
    if (!mongoose.Types.ObjectId.isValid(data.rudimentId)) {
        throw new ValidationError("Invalid rudimentId")
    }

    return repo.createSession(data)
}

export const getSessions = async (
    page: number,
    limit: number,
    rudimentId?: string,
    fromDate?: string,
    toDate?: string
) => {

    const skip = (page - 1) * limit

    const filters: any = {}

    if (rudimentId) {
        if (!mongoose.Types.ObjectId.isValid(rudimentId)) {
            throw new ValidationError("Invalid rudimentId")
        }

        filters.rudimentId = rudimentId
    }

    if (fromDate || toDate) {
        filters.createdAt = {}

        if (fromDate) {
            filters.createdAt.$gte = new Date(fromDate)
        }

        if(toDate) {
            filters.createdAt.$lte = new Date(toDate)
        }
    }

    const sessions = await repo.getSession(filters, skip, limit)
    const total = await repo.countSessions(filters)

    return {
        data: sessions,
        page,
        limit,
        total,
        pages: Math.max(1, Math.ceil(total / limit))
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
