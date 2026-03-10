import axiosClient from "./axiosClient"

export interface AuthResponse {
    token: string
}

export const login = async (email: string, password: string) => {
    const response = await axiosClient.post<AuthResponse>("/auth/login", {
        email,
        password,
    })

    return response.data
}

export const register = async (email: string, password: string) => {
    const response = await axiosClient.post<AuthResponse>("/auth/register", {
        email,
        password,
    })

    return response.data
}