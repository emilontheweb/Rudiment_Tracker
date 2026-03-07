import dotenv from "dotenv"
import mongoose from "mongoose"
import express, { Request, Response } from "express"
import cors from "cors"
import rudimentRoutes from "./routes/rudiments"
import sessions from "./routes/sessions"
import { connectDatabase } from "./config/database"
import { errorHandler } from "./middleware/errorHandler"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(errorHandler)
connectDatabase()
    .then(() => console.log("Connected to database"))
    .catch((err: unknown) => {
        console.error("Database connetion failed:", err)
        process.exit(1)
    })

app.get("/api/test", (req: Request, res: Response) => {
    res.json({mssg: "Backend is running"})
})

app.use("/api/rudiments", rudimentRoutes)
app.use("/api/sessions", sessions)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})