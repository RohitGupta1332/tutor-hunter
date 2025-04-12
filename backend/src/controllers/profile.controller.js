import { Tutor } from "../models/tutor.model.js";
import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";
import { upload } from "../utils/multer.js";

export const createTutorProfile = async (req, res) => {
    try {
        const { name, gender, dob, location, subjects, classes, experience, qualification, mode, bio } = req.body;
        const userId = req.user.userId;

        const uploadImage = () => {
            return new Promise((resolve, reject) => {
                upload.single("image")(req, res, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(req.file ? req.file.filename : "");
                    }
                });
            });
        };

        const imageUrl = await uploadImage();

        const tutor = await Tutor.create({
            userId, image: imageUrl, name, gender, dob, location, subjects, classes,
            experience, qualification, mode, bio
        });

        await User.findByIdAndUpdate(userId, { isProfileCreated: true });

        res.status(201).json({ message: "Tutor profile created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const createStudentProfile = async (req, res) => {
    try {
        const { name, location, student_class, subjects_needed, mode } = req.body;
        const userId = req.user.userId;
        const uploadImage = () => {
            return new Promise((resolve, reject) => {
                upload.single("image")(req, res, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(req.file ? req.file.filename : "");
                    }
                });
            });
        };

        const imageUrl = await uploadImage();

        const student = await Student.create({
            userId, image: imageUrl, name, location, student_class, subjects_needed, mode
        });
        await User.findByIdAndUpdate(userId, { isProfileCreated: true });
        res.status(201).json({ message: "Student profile created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const fetchTutorProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tutor = await Tutor.findOne({ userId });
        res.status(200).json({ profile: tutor });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const fetchStudentProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const student = await Student.findOne({ userId });
        res.status(200).json({ profile: student });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
