import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/AppError";

export const validate =
    (schema: z.ZodTypeAny, source: "body" | "query" = "body") => 
    (req: Request, res: Response, next: NextFunction) => {

        const data = source === "body" ? req.body : req.query

        const result = schema.safeParse(data)

        if(!result.success) {
            const message = result.error.issues
            .map(issue => `${String(issue.path[0])}: ${issue.message}`)
            .join(", ")

            return next(new ValidationError(message))
        }

        if (source === "body") {
            req.body = result.data
        } else {
            req.query = result.data as any
        }

        next()
    }