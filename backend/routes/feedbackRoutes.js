import { Router } from "express";
import axios from "axios";
import mammoth from "mammoth";
import JSZip from "jszip";

const feedbackRouter = Router();

const isEmpty = (obj) => {
	return JSON.stringify(obj) === "{}";
};

const fileUrl = "https://byuh.instructure.com/files/72392808/download?download_frd=1&verifier=z5IWxXqVxTNZfhbKySGrvQR4zFYNc3NVZqb6ZZmO";

feedbackRouter.get("/", async (req, res) => {
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

export default feedbackRouter;