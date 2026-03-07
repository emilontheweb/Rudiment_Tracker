import { Request, Response } from "express";
import * as service from "../services/sessionService"
import { asyncHandler } from "../utils/asyncHandler";

export const createSession = asyncHandler(async (req: Request, res: Response) => {
    const session = await service.createSession(req.body)

    res.status(201).json(session)
})

export const getSessions = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 10)

    const rudimentId = req.query.rudimentId as string | undefined
    const fromDate = req.query.fromDate as string | undefined
    const toDate = req.query.toDate as string | undefined

    const result = await service.getSessions(
        page,
        limit,
        rudimentId,
        fromDate,
        toDate
    )

    res.json(result)
})

export const getSessionById = asyncHandler(async (req: Request<{id: string}>, res: Response) => {
    const session = await service.getSessionById(req.params.id)

    res.json(session)
}) 

export const deleteSession = asyncHandler(async (req: Request<{id: string}>, res: Response) => {
    await service.deleteSession(req.params.id)

    res.status(204).send()
})