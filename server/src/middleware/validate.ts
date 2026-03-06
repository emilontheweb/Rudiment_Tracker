import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/AppError";

export const validate =
    (schema: z.ZodTypeAny) => 
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)

        if(!result.success) {
            const message = result.error.issues
            .map(issue => `${String(issue.path[0])}: ${issue.message}`)
            .join(", ")

            return next(new ValidationError(message))
        }

        req.body = result.data

        next()
    }