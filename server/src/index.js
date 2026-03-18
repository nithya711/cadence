import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import cron from "node-cron";

import { connectDB } from "./lib/db.js";

import adminRouter from "./routes/admin.route.js";
import authRouter from "./routes/auth.route.js";
import songRouter from "./routes/song.route.js";
import albumRouter from "./routes/album.route.js";
import statsRouter from "./routes/stats.route.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
}));

const tempDir = path.join(process.cwd(), "tmp");

cron.schedule("0 * * * *", () => {
    if(fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (error, files) => {
            if(error) {
                console.error("Error :", error);
                return;
            }
            for(const file of files) {
                fs.unlink(path.join(tempDir, file), (error) => {});
            }
        });
    }
});

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);
app.use("/api/stats", statsRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
    });
}

app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err });
});

app.listen(PORT, () => {
    console.log(`Server listening to requests on port : ${PORT}`);
    connectDB();    
});