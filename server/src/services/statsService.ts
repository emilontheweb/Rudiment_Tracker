import mongoose from "mongoose"
import * as repo from "../repositories/statsRepository"
import { ValidationError } from "../errors/AppError"

export const getWeeklyPractice = async (userId?: string) => {

    const result = await repo.getWeeklyPractice(userId)

    return result.map((item: any) => ({
        week: `${item._id.year}-W${item._id.week}`,
        totalMinutes: item.totalMinutes
    }))
}

export const getBpmProgression = async (rudimentId: string, userId?: string) => {

    if(!mongoose.Types.ObjectId.isValid(rudimentId)) {
        throw new ValidationError("Invalid rudimentId")
    }

    const result = await repo.getBpmProgression(rudimentId, userId)

    return result.map((item: any) => ({
        date: item._id.date,
        avgBpm: Math.round(item.avgBpm)
    }))
}

export const getPracticeStreak = async (userId?: string) => {

    const days = await repo.getPracticeDays(userId)

    const dates = days.map((d: any) => new Date(d._id.date))

    if (dates.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0
        }
    }

    let longestStreak = 1
    let currentStreak = 1
    let tempStreak = 1

    for (let i = 1; i < dates.length; i++) {
        
        const prev = dates[i - 1]
        const current = dates[i]

        const diff = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)

        if (diff === 1) {
            tempStreak++
        } else {
            longestStreak = Math.max(longestStreak, tempStreak)
            tempStreak = 1
        }
    }

    longestStreak = Math.max(longestStreak, tempStreak)

    const today = new Date()
    const lastPractice = dates[dates.length - 1]

    const diff = (today.getTime() - lastPractice.getTime()) / (1000 * 60 * 60 * 24)

    if (diff <= 1) {
        currentStreak = tempStreak
    } else {
        currentStreak = 0
    }

    return {
        currentStreak,
        longestStreak
    }
}

export const getSummaryStats = async (userId?: string) => {

    const stats = await repo.getSummaryStats(userId)

    if (!stats) {
        return {
            totalSessions: 0,
            totalPracticeMinutes: 0,
            averageBpm: 0
        }
    }

    return {
        totalSessions: stats.totalSessions,
        totalPracticeMinutes: stats.totalPracticeMinutes,
        averageBpm: Math.round(stats.averageBpm)
    }
}