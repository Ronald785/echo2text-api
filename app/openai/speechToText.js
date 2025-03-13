import fs from "fs";
import openai from "./openai.js";

async function speechToText(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    try {
        const transcriptionResponse = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });

        return transcriptionResponse.text;
    } catch (error) {
        console.error("Error during audio transcription:", error);
        throw new Error("Failed to transcribe audio");
    }
}

export default speechToText;
