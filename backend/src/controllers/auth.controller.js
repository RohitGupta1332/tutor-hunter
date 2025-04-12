import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { PendingUser } from "../models/pendingUser.model.js"
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationMail } from "../middlewares/email.config.js";

export const signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const verificationCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const newPendingUser = new PendingUser({
            email,
            password: hash,
            role,
            verificationCode,
            expiresAt
        });

        await newPendingUser.save();

        await sendVerificationMail(email, verificationCode);

        res.status(201).json({ message: "Verification code sent", email: email });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const pendingUser = await PendingUser.findOne({
            email, verificationCode, expiresAt:
                { $gt: new Date() }
        });
        if (!pendingUser) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }
        const user = await User.create({
            email,
            password: pendingUser.password,
            role: pendingUser.role
        });

        await pendingUser.deleteOne({ email });

        const token = generateToken(user);
        res.cookie("token", token, {
            credential: true
        });

        res.status(201).json({ message: "New user added" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);
        res.cookie("token", token, {
            credential: true
        });
        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}