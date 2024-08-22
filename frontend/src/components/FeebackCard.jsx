import PropTypes from "prop-types";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import useFeedbackApi from "../features/feedback/useFeedbackApi";
import { styles } from "../utils/styles";

const openAPIFlag = import.meta.env.VITE_OPENAPI_FLAG;

const FeedbackCard = ({ assignment, submission }) => {
	const { description } = assignment;
	const { loading, error, feedback, getFeedback, setFeedback } =
		useFeedbackApi();
	const prompt =
		"Assignment description: " +
		description +
		"\n" +
		"My submission: " +
		submission?.body;

	const handleFeedback = async () => {
		setFeedback("");
		getFeedback(submission.attachments?.[0]?.url, prompt);
	};

	useEffect(() => {
		if (submission && openAPIFlag) {
			handleFeedback();
		}
	}, [submission]);

	return (
		<>
			{submission && (
				<p className="text-slate-400">
					{submission.submission_type === "online_text_entry" ||
					submission.attachments?.[0]?.filename.endsWith(".docx")
						? "We have your submission!"
						: "Submission type not supported"}
				</p>
			)}
			<div className="bg-slate-700 rounded-lg p-4 flex flex-col gap-2">
				<h2 className={`${styles.sectionSubText}`}>Feedback</h2>
				{error && (
					<p className="text-red-500 bg-red-200 rounded-md p-2 text-md text-center">
						{error.response.data}
					</p>
				)}

				{loading && <p>Loading feedback...</p>}
				{feedback && (
					<div className="text-slate-200 flex flex-col gap-2">
						<ReactMarkdown>{feedback}</ReactMarkdown>
					</div>
				)}
				<div>
					<button
						className={`mt-2 p-3 py-2 ml-auto rounded-xl text-slate-100 hover:bg-violet-800 tracking-wider max-w-[200px] text-sm min-w-fit ${
							feedback !== "" ? "bg-violet-700" : "bg-slate-500"
						}`}
						disabled={loading || error}
						onClick={handleFeedback}
					>
						Generate Feedback
					</button>
				</div>
			</div>
		</>
	);
};

FeedbackCard.propTypes = {
	assignment: PropTypes.object,
	submission: PropTypes.object,
};

export default FeedbackCard;
