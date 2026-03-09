import { Request, Response } from "express"
import * as authService from "../services/authService"

export const register = async (req: Request, res: Response) => {
    
    const { email, password } = req.body

    const result = await authService.registerUser(email, password)

    res.status(201).json(result)
}

export const login = async (req: Request, res: Response) => {
    
    const { email, password } = req.body
    
    const result = await authService.loginUser(email, password)

    res.json(result)
}