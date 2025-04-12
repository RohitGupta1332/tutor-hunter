import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        reqruired: true
    },
    isProfileCreated: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);