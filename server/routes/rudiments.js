const express = require("express")
const router = express.Router()

let rudiments = [
    { id: 1, name: "Single Stroke Roll", bpm: 80 },
    { id: 2, name: "Double Stroke Roll", bpm: 90 },
    { id: 3, name: "Pataflafla", bpm: 100 }
]

router.get("/", (req, res) => {
    res.json(rudiments)
})

router.post("/", (req, res) => {
    const { name, bpm } = req.body

    const newRudiment = {
        id: rudiments.length + 1,
        name, 
        bpm
    }

    rudiments.push(newRudiment)
    res.status(201).json(newRudiment)
})
module.exports = router