require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const rudimentRoutes = require("./routes/rudiments")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err))

app.get("/api/test", (req, res) => {
    res.json({mssg: "Backend is running"})
})

app.use("/api/rudiments", rudimentRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})