export interface PracticeSession {
    _id: string
    userId: string
    rudimentId: string
    bpm: string
    durationInMinutes: number
    notes?: string
    createdAt: string
}