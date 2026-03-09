import mongoose, { Schema, Document, Types } from "mongoose"

export interface IRudiment extends Document {
    name: string
    bpm: number
    createdBy?: Types.ObjectId | null
    isSystem: boolean
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
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        isSystem: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

export const Rudiment = mongoose.model<IRudiment>("Rudiment", RudimentSchema)