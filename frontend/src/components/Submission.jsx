import PropTypes from "prop-types";

const Submission = ({ submission }) => {
	return (
		<div className="flex flex-col gap-y-4 bg-slate-800 p-6 rounded-2xl h-auto tracking-wide">
			<p className="text-slate-500">ID: {submission._id}</p>
			<p>Summary: {submission.content_summary}</p>
			<p>Last Updated: {submission.updatedAt}</p>
		</div>
	);
};

Submission.propTypes = {
	submission: PropTypes.object.isRequired,
};

export default Submission;
