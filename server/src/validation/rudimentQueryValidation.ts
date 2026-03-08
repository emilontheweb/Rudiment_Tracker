import { z } from "zod"

export const rudimentQuerySchema = z.object({

  page: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .optional(),

  limit: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .optional(),

  minBpm: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .optional(),

  maxBpm: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .optional(),

  search: z
    .string()
    .min(1)
    .optional()

})