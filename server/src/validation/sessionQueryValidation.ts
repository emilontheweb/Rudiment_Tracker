import { z } from "zod"

export const sessionQuerySchema = z.object({

    page: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .optional(),

    limit: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .optional,

    rudimentId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
        .optional(),
    
    fromDate: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid date"
        })
        .optional(),
    
    toDate: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid date"
        })
        .optional()
})