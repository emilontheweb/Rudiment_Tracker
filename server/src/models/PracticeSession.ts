import mongoose, { Schema, Document, Types } from "mongoose";

export interface PracticeSessionDocument extends Document {
    userId: Types.ObjectId
    rudimentId: Types.ObjectId
    bpm: number
    durationInMinutes: number
    notes?: string
    createdAt: Date 
}

const practiceSessionSchema = new Schema<PracticeSessionDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
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
        }, 
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    }
)

practiceSessionSchema.index({
    userId: 1,
    createdAt: -1
})

practiceSessionSchema.index({
    userId: 1,
    rudimentId: 1,
    createdAt: -1
})

export const PracticeSession = mongoose.model<PracticeSessionDocument>(
    "PracticeSession",
    practiceSessionSchema
)