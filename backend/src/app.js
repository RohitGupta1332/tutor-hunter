import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConn from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import profileRoute from "./routes/profile.route.js";


dotenv.config();
databaseConn();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);


app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
})