import { Router } from "express";
import axios from "axios";
import mammoth from "mammoth";
import dotenv from "dotenv";
import OpenAI from "openai";
import feedback from "../controllers/assistant.js";

dotenv.config({ path: ".env", override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const assistant = await openai.beta.assistants.retrieve(
  process.env.ASSISTANT_ID
)

const feedbackRouter = Router();

const fileUrl = "https://byuh.instructure.com/files/72392808/download?download_frd=1&verifier=z5IWxXqVxTNZfhbKySGrvQR4zFYNc3NVZqb6ZZmO";

feedbackRouter.get("/file", async (req, res) => {
    try {
        const response = await axios.get(fileUrl, {
            responseType: "arraybuffer",
        });
        const result = await mammoth.extractRawText({
			buffer: Buffer.from(response.data),
		});
		console.log("Extracted text:", result.value);
    } catch (error) {
        console.error(error);
    }
});
feedbackRouter.post("/", async (req, res) => {
    try {
        if (req.body === undefined || req.body === "") {
            return res.status(400).json({ message: "No prompt provided" });
        }
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

feedbackRouter.get("/", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
    
    console.log("Feedback request received");

    try {
        if (req.body === undefined || req.body === "") {
            return res.status(400).json({ message: "No prompt provided" });
        }
        const prompt = "Hello!";
        feedback(openai, prompt, assistant, res);

		req.on("close", () => {
			res.end();
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

export default feedbackRouter;