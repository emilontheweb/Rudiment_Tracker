import axios from "axios"

const axiosClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token")
        }
        
        return Promise.reject(error)
    }
)

export default axiosClient