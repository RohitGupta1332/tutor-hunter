import { createTutorProfile, createStudentProfile, fetchTutorProfile, fetchStudentProfile } from "../controllers/profile.controller.js";
import express from "express";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/tutor", protectRoute, createTutorProfile);
router.post("/student", protectRoute, createStudentProfile);
router.get("/tutor", protectRoute, fetchTutorProfile);
router.get("/student", protectRoute, fetchStudentProfile);

export default router;