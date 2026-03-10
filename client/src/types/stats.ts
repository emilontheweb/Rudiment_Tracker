export interface WeeklyPractice {
    week: string
    totalMinutes: number
}

export interface BpmProgression {
    date: string
    avgBpm: number
}

export interface PracticeStreak {
    currentStreak: number
    longestStreak: number
}

export interface SummaryStats {
    totalSessions: number
    totalPracticeMinutes: number
    averageBpm: number
}