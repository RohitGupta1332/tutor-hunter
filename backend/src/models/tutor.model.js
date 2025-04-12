import mongoose, { Schema } from "mongoose";

const tutorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    subjects: {
        type: Array,
        required: true
    },
    classes: {
        type: Array,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    }
}, { timestamps: true });

export const Tutor = mongoose.model("Tutor", tutorSchema);