import axios from "axios";
import mammoth from "mammoth";
import dotenv from "dotenv";
import OpenAI from "openai";
import feedback from "../assistant.js";
import { User } from "../model/index.js";

dotenv.config({ path: ".env", override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const assistant = await openai.beta.assistants.retrieve(
	process.env.ASSISTANT_ID
);

const handleFeedback = async (req, res) => {
	const currentUser = await User.findById(req.user._id);
	
	if (!currentUser.checkPromptLeft()) {
		return res.status(403).send("You have reached your daily limit of prompts");
	}

	try {
		if (req.query || req.body) {
			let prompt = "";
			if (req.query.fileUrl) {
				const response = await axios.get(
					req.query.fileUrl,
					{
						responseType: "arraybuffer",
					}
				);
				const rawText = await mammoth.extractRawText({
					buffer: Buffer.from(response.data),
				});
				prompt = rawText.value;
			} else if (req.body) {
				prompt = req.body;
			}
			await feedback(openai, prompt, assistant, res);
		} else if (
			req.body === undefined ||
			req.body === "" ||
			req.params === undefined ||
			req.params === ""
		) {
			return res.status(400).send("No prompt provided");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("An error has occurred. Please contact the administrator.");
	}
};

export default handleFeedback;
