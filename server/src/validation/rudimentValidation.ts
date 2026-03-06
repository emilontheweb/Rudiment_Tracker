import { z } from "zod"

export const createRudimentSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name too long"),

    bpm: z
        .number()
        .int()
        .min(20, "BPM too low")
        .max(400, "BPM too high"),
})

export const updateRudimentSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(100)
        .optional(),

    bpm: z
        .number()
        .int()
        .min(20)
        .max(400)
        .optional()
})