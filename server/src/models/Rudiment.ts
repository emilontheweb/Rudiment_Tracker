import mongoose, { Schema, Document } from "mongoose"

export interface IRudiment extends Document {
    name: string
    bpm: number
}

const RudimentSchema = new Schema(
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

export default mongoose.model<IRudiment>("Rudiment", RudimentSchema)