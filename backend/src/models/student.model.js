import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
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
    location: {
        type: String,
        required: true
    },
    student_class: {
        type: String,
        required: true
    },
    subjects_needed: {
        type: Array,
        required: true
    },
    mode: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);