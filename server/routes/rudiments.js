const express = require("express")
const router = express.Router()
const Rudiment = require("../models/Rudiment")

router.get("/", async (req, res) => {
    try{
        const rudiments = await Rudiment.find().sort({ createdAt: -1 })
        res.json(rudiments) 
    } catch (error) {
        res.status(500).json({error: "Failed to fetch"})
    }
})

router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, bpm } = req.body;

    const newRudiment = new Rudiment({ name, bpm });
    const savedRudiment = await newRudiment.save();

    console.log("Saved:", savedRudiment);

    res.status(201).json(savedRudiment);

  } catch (error) {
    console.error("ERROR:", error);   // ← viktigt
    res.status(500).json({ error: error.message });
  }
});
module.exports = router