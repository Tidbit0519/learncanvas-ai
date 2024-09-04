import PropTypes from "prop-types";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import useFeedbackApi from "../features/feedback/useFeedbackApi";
import { styles } from "../utils/styles";

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

	const checkSubmissionType = () => {
		if (
			submission.submission_type === "online_text_entry" ||
			submission.attachments?.[0]?.filename.endsWith(".docx")
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleFeedback = async () => {
		setFeedback("");
		getFeedback(submission.attachments?.[0]?.url, prompt);
	};

	useEffect(() => {
		if (submission && checkSubmissionType()) {
			handleFeedback();
		}
	}, [submission]);

	return (
		<>
			{submission && (
				<p className="text-slate-400 p-2">
					{submission.submission_type === "online_text_entry" ||
					submission.attachments?.[0]?.filename.endsWith(".docx")
						? "We have your submission!"
						: "We have your submission, but the AI tutor only supports online text entry and online upload (.docx) for now."}
				</p>
			)}
			<div className="sm:bg-slate-700 sm:rounded-lg sm:p-4 flex flex-col gap-2 lg:bg-slate-900 lg:rounded-none lg:p-0">
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
						disabled={loading || error || !checkSubmissionType()}
						onClick={handleFeedback}
					>
						Regenerate Feedback
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
