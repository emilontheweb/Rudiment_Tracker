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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Rudiment.findByIdAndDelete(id)

    if (!deleted){
      return res.status(404).json({ error: "Rudiment not found"})
    }

    res.json({ message: "Rudiment deleted" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete rudiment" })
  }
}) 

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { name, bpm } = req.body

    const updated = await Rudiment.findByIdAndUpdate(
      id,
      { name, bpm },
      { new: true, runValidators: true}
    )

    if (!updated){
      return res.status(404).json({ error: "Rudiment not found" })
    }

    res.json(updated)
  } catch (error){
    res.status(500).json({ error: "Failed to update rudiment" })
  }
})

module.exports = router