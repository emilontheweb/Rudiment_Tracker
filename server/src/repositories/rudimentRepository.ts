import mongoose, { Types } from "mongoose"
import { Rudiment, IRudiment } from "../models/Rudiment";

interface RudimentQuery {
    page: number
    limit: number
    minBpm?: number
    maxBpm?: number
    search?: string
    userId?: Types.ObjectId | string
}

export const findAllRudiments = async (query: RudimentQuery) => {
    const filter: mongoose.QueryFilter<IRudiment> = {}

    if(query.userId) {
        filter.$or = [
            { isSystem: true},
            { createdBy: query.userId }
        ]
    }

    if(query.minBpm) {
        filter.bpm = { ...filter.bpm as object, $gte: query.minBpm}
    }
    if(query.maxBpm) {
        filter.bpm = { ...filter.bpm as object, $lte: query.maxBpm}
    }

    if(query.search) {
        filter.name = {$regex: query.search, $options: "i"}
    }

    const skip = (query.page -1) * query.limit

    const rudiments = await Rudiment
        .find(filter)
        .skip(skip)
        .limit(query.limit)
        .sort({ createdAt: -1})

        const total = await Rudiment.countDocuments(filter)

        return {
            data: rudiments,
            page: query.page,
            limit: query.limit,
            total,
            pages: Math.ceil(total / query.limit)
        }
}

export const findRudimentByIdRepo = async (
    id: string
): Promise<IRudiment | null> => {
    return Rudiment.findById(id)
}

export const createRudimentRepo = async (
    name: string,
    bpm: number,
    userId?: Types.ObjectId | string
): Promise<IRudiment> => {
    const newRudiment = new Rudiment({ name,
        bpm,
        createdBy: userId,
        isSystem: false })
    return newRudiment.save()
}

export const updateRudimentRepo = async (
    id: string,
    name: string,
    bpm: number,
    userId?: Types.ObjectId | string
): Promise<IRudiment | null> => {
    return Rudiment.findOneAndUpdate(
        {
            _id: id,
            createdBy: userId,
            isSystem: false
        },
        {name, bpm},
        {returnDocument: "after", runValidators: true }
    )
}

export const deleteRudimentRepo = async (
    id: string,
    userId?: Types.ObjectId | string
): Promise<IRudiment | null> => {
    return Rudiment.findOneAndDelete(
        {
            _id: id,
            createdBy: userId,
            isSystem: false
        })
}