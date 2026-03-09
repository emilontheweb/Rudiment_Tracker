import { User } from "../models/User"

export const createUser = (data: {
    email: string,
    passwordHash: string
}) => {
    return User.create(data)
}

export const findUserByEmail = (email: string) => {
    return User.findOne({ email })
}

export const findUserById = (id: string) => {
    return User.findById(id)
}