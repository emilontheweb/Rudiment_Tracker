import { Request, Response } from "express";
import * as service from "../services/statsService"
import { asyncHandler } from "../utils/asyncHandler";

export const getWeeklyPractice = asyncHandler(async (req: Request, res: Response) => {
    const stats = await service.getWeeklyPractice(
        req.userId?.toString()
    )
    
    res.json(stats)
})

export const getBpmProgression = asyncHandler(async (req: Request, res: Response) => {

    const rudimentId = req.query.rudimentId as string

    const stats = await service.getBpmProgression(
    rudimentId,
    req.userId?.toString()
    )

    res.json(stats)
})

export const getPracticeStreak = asyncHandler(async (req: Request, res: Response) => {

    const streak = await service.getPracticeStreak(
        req.userId?.toString()
    )

    res.json(streak)
})

export const getSummaryStats = asyncHandler(async (req: Request, res: Response) => {
    
    const stats = await service.getSummaryStats(
        req.userId?.toString()
    )

    res.json(stats)
})