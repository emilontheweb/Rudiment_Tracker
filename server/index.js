const express = require("express")
const cors = require("cors")
const rudimentRoutes = require("./routes/rudiments")

const app = express()
const PORT = 8080

app.use(cors())
app.use(express())
app.use(express.json())

app.get("/api/test", (req, res) => {
    res.json({mssg: "Backend is running"})
})

app.use("/api/rudiments", rudimentRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})