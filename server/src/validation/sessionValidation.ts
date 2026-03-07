import { z } from "zod"

export const createSessionSchema = z.object({
    rudimentId: z.string().min(1, "rudimentId is required"),

    bpm: z
        .int()
        .min(20, "BPM too low")
        .max(400, "BPM too high"),

    durationInMinutes: z
        .number()
        .int()
        .min(1, "Duration must be at least 1 minute"),

    notes: z.string().max(500).optional()
})