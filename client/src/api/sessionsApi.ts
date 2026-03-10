import axiosClient from "./axiosClient"
import { PracticeSession } from "../types/session"
import { PaginatedResponse } from "../types/api"
import { SessionsQuery } from "../types/query"

export const getSessions = async (query?: SessionsQuery) => {
    const response = await axiosClient.get<PaginatedResponse<PracticeSession>>("/sessions",
        {
            params: query,
        }
    )
    return response.data
}

export const createSession = async (data: {
    rudimentId: string
    bpm: number
    durationInMinutes: number
    note?: string
}) => {
    const response = await axiosClient.post<PracticeSession>("/sessions", data)
    return response.data
}

export const deleteSession = async (id: string) => {
    const response = await axiosClient.delete(`/sessions/${id}`)
        return response.data 
}