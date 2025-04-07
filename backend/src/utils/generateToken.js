import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
    return jwt.sign({userId: user._id, email: user.email, isProfileCreated: user.isProfileCreated}, process.env.JWT_KEY,{
        expiresIn: "7d"
    });
}