import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

const baseUrl = import.meta.env.VITE_API_URL;

const useFeedbackApi = () => {
	const token = useSelector(selectCurrentToken);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [feedback, setFeedback] = useState("");

	const getFeedback = async (fileUrl, prompt) => {
		try {
			setError(null);
			setLoading(true);
			const params = {};
			if (fileUrl) {
				params.fileUrl = fileUrl;
			}

			const response = await axios.post(`${baseUrl}/feedback`, prompt, {
				headers: {
					Authorization: token,
					"Content-Type": "text/plain",
				},
				params: params,
			});
			setFeedback(response.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
			console.error(err);
		}
	};

	return { loading, error, feedback, getFeedback, setFeedback };
};

export default useFeedbackApi;
