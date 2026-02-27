const mongoose = require("mongoose")

const RudimentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        bpm: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Rudiment", RudimentSchema)