import mongoose from "mongoose";
import { PracticeSession } from "../models/PracticeSession";

export const getWeeklyPractice = async () => {
    return PracticeSession.aggregate([
        {
            $group: {
                _id: {
                    year: { $isoWeekYear:  "$createdAt" },
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

export const getBpmProgression = async (rudimentId: string) => {

    return PracticeSession.aggregate([
        {
            $match: {
                rudimentId: new mongoose.Types.ObjectId(rudimentId)
            }
        },
        {
            $group:{
                _id: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
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

export const getPracticeDays = async () => {

    return PracticeSession.aggregate([
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
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

export const getSummaryStats = async () => {
    
    const result = await PracticeSession.aggregate([
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