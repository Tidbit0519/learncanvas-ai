import axios from "axios";
import mammoth from "mammoth";
import feedback from "../assistant.js";
import { User } from "../model/index.js";

const handleFeedback = async (req, res) => {
	const currentUser = await User.findById(req.user._id);

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
			const response = await feedback(prompt);
			return res.status(200).send(response);
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
