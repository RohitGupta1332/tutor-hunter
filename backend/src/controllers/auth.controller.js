import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hash
        });

        await newUser.save();

        const token = generateToken(newUser);
        res.cookie("token", token, {
            credential: true
        })

        res.status(201).json({ message: "New user added" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
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
        res.status(500).json({ message: "Internal server error", error: error });
    }
}