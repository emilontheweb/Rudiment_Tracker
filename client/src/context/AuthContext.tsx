import { createContext, useContext, useEffect, useState, ReactNode, use } from "react"
import { login as loginApi, register as registerApi } from "../api/authApi"

interface AuthContextType {
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    const login = async (email: string, password: string) => {
        const data = await loginApi(email, password)

        localStorage.setItem("token", data.token)
        setToken(data.token)
    }

    const register = async (email: string, password: string) => {
        const data = await registerApi(email, password)

        localStorage.setItem("token", data.token)
        setToken(data.token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    const value: AuthContextType = {
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context
}