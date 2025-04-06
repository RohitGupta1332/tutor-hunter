import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConn from "./lib/db.js";


dotenv.config();
databaseConn();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
})