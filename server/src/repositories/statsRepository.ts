import mongoose from "mongoose";
import { PracticeSession } from "../models/PracticeSession";

export const getWeeklyPractice = async (userId?: string) => {

    if (!userId) return []

    return PracticeSession.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $isoWeekYear: "$createdAt" },
                    week: { $isoWeek: "$createdAt" }
                },
                totalMinutes: { $sum: "$durationInMinutes" }
            }
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.week": 1
            }
        }
    ])

}

export const getBpmProgression = async (
    rudimentId: string,
    userId?: string
) => {

    if (!userId) return []

    return PracticeSession.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                rudimentId: new mongoose.Types.ObjectId(rudimentId)
            }
        },
        {
            $group: {
                _id: {
                    date: {
                        $dateTrunc: {
                            date: "$createdAt",
                            unit: "day"
                        }
                    }
                },
                avgBpm: { $avg: "$bpm" }
            }
        },
        {
            $sort: {
                "_id.date": 1
            }
        }
    ])

}

export const getPracticeDays = async (userId?: string) => {

    if (!userId) return []

    return PracticeSession.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $group: {
                _id: {
                    date: {
                        $dateTrunc: {
                            date: "$createdAt",
                            unit: "day"
                        }
                    }
                }
            }
        },
        {
            $sort: {
                "_id.date": 1
            }
        }
    ])

}

export const getSummaryStats = async (userId?: string) => {

    if (!userId) return null

    const result = await PracticeSession.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $group: {
                _id: null,
                totalSessions: { $sum: 1 },
                totalPracticeMinutes: { $sum: "$durationInMinutes" },
                averageBpm: { $avg: "$bpm" }
            }
        }
    ])

    return result[0]

}