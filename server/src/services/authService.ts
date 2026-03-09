import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as userRepo from "../repositories/userRepository"
import { AppError } from "../errors/AppError"

const JWT_SECRET = process.env.JWT_SECRET as string

export const registerUser = async (email: string, password: string) => {
    
    const existingUser = await userRepo.findUserByEmail(email)

    if(existingUser) {
        throw new AppError("Email already registered", 400)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await userRepo.createUser({
        email,
        passwordHash
    })

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
    )

    return { token, user }
}

export const loginUser = async (email: string, password: string) => {
    
    const user = await userRepo.findUserByEmail(email)
    
    if (!user) {
        throw new AppError("Invalid credentials", 401)
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (!isValid) {
        throw new AppError("Invalid credentials", 401)
    }

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
    )

    return { token, user }
}