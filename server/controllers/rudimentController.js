const Rudiment = require("../models/Rudiment")

exports.getRudiments = async (req, res) => {
    try{
        const rudiments = await Rudiment.find().sort({ createdAt: -1 })
        res.json(rudiments) 
    } catch (error) {
        res.status(500).json({error: "Failed to fetch"})
    }
}

exports.createRudiment = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, bpm } = req.body;

    const newRudiment = new Rudiment({ name, bpm });
    const saved = await newRudiment.save();

    res.status(201).json(saved);

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateRudiment = async (req, res) => {
    try {
        const { id } = req.params
        const { name, bpm } = req.body
    
        const updated = await Rudiment.findByIdAndUpdate(
          id,
          { name, bpm },
          { returnDocument: "after", runValidators: true}
        )
    
        if (!updated){
          return res.status(404).json({ error: "Rudiment not found" })
        }
    
        res.json(updated)
    } catch (error){
    res.status(500).json({ error: "Failed to update rudiment" })
    }
}

exports.deleteRudiment = async (req, res) => {
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
}