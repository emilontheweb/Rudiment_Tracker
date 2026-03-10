import axiosClient from "./axiosClient"
import {
    WeeklyPractice,
    BpmProgression,
    PracticeStreak,
    SummaryStats
} from "../types/stats"

export const getWeeklyPractice = async () => {
    const response = await axiosClient.get<WeeklyPractice[]>("/stats/weekly-practice")
    return response.data
}

export const getBpmProgression = async () => {
    const response = await axiosClient.get<BpmProgression[]>("/stats/bpm-progression")
    return response.data
}

export const getPracticeStreak = async () => {
    const response = await axiosClient.get<PracticeStreak>("/stats/practece-streak")
    return response.data
}

export const getSummary = async () => {
    const response = await axiosClient.get<SummaryStats>("/stats/summary")
    return response.data
}