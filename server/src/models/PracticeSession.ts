import mongoose, { Schema, Document } from "mongoose";

export interface PracticeSessionDocument extends Document {
    rudimentId: mongoose.Types.ObjectId
    bpm: number
    durationInMinutes: number
    notes?: string
    createdAt: Date 
}

const practiceSessionSchema = new Schema<PracticeSessionDocument>(
    {
        rudimentId: {
            type: Schema.Types.ObjectId,
            ref: "Rudiment",
            required: true
        },
        bpm: {
            type: Number,
            required: true
        },
        durationInMinutes: {
            type: Number,
            required: true
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: {createdAt: true, updatedAt: false},
        versionKey: false
    }
)

practiceSessionSchema.index({ rudimentId: 1, createdAt: -1 })

export const PracticeSession = mongoose.model<PracticeSessionDocument>(
    "PracticeSession",
    practiceSessionSchema
)