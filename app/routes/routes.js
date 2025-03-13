import fs from "fs";
import path from "path";
import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import __dirname from "../utils/__dirname.js";
import speechToText from "../openai/speechToText.js";

const router = express.Router();

const uploadDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"));
});

const allowedTypes = [
    "audio/flac",
    "audio/mpeg",
    "audio/mp3",
    "audio/mp4",
    "audio/mpga",
    "audio/m4a",
    "audio/ogg",
    "audio/wav",
    "audio/wave",
    "audio/webm",
    "audio/x-wav",
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        cb(null, `${uuidv4()}${fileExt}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
    fileFilter: (req, file, cb) => {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Unsupported file format. Allowed: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm."));
        }
    },
});

router.post("/", upload.single("audio"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: "No audio file uploaded." });
    }

    const audioFilePath = req.file.path;
    try {
        const startTotalTime = performance.now();
        const audioTranscription = await speechToText(audioFilePath);
        const endTotalTime = performance.now();

        const totalTime = ((endTotalTime - startTotalTime) / 1000).toFixed(2);

        return res.json({
            success: true,
            transcription: audioTranscription,
            processingTime: `${totalTime} s`,
        });
    } catch (error) {
        console.error("Error processing transcription:", error);
        return res.status(500).json({ success: false, error: "Failed to process the audio file." });
    } finally {
        try {
            if (fs.existsSync(audioFilePath)) {
                await fs.promises.unlink(audioFilePath);
            }
        } catch (err) {
            console.error("Error deleting temporary file:", err);
        }
    }
});

export default router;
