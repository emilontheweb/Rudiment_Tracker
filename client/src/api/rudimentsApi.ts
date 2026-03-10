import axiosClient from "./axiosClient"
import { Rudiment } from "../types/rudiment"
import { PaginatedResponse } from "../types/api"
import { RudimentsQuery } from "../types/query"

export const getRudiments = async (query?: RudimentsQuery) => {
    const response = await axiosClient.get<PaginatedResponse<Rudiment>>("/rudiments", { params: query })
    return response.data
}

export const createRudiment = async (data: {
    name: string
    bpm: number
}) =>  {
    const response = await axiosClient.post<Rudiment>("/rudiments", data)
    return response.data
}

export const updateRudiment = async (
    id: string,
    data: { name: string, bpm: number }
) => {
    const response = await axiosClient.put<Rudiment>(`/rudiments/${id}`, data)
    return response.data
}

export const deleteRudiment = async (id: string) => {
    const response = await axiosClient.delete<{ message: string }>(`/rudiments/${id}`)
    return response.data
}