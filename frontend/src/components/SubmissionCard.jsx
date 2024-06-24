import PropTypes from "prop-types";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SubmissionCard = ({ submission }) => {

	return (
		<div className="flex flex-col gap-y-2 bg-slate-800 p-6 rounded-2xl h-auto tracking-wide">
			<p className="text-slate-500">ID: {submission._id}</p>
			<p>Summary: {submission.content_summary}</p>
			<p>Last Updated: {submission.updatedAt}</p>
			<div className="flex justify-end gap-2 pt-2 mt-auto">
				<Link
					className="p-2 bg-slate-800 rounded-2xl text-white hover:bg-slate-900"
					to={`/submissions/${submission._id}`}>
					<EyeIcon className="h-4 w-4" />
				</Link>
				<button
					className="p-2 bg-slate-800 rounded-2xl text-white hover:bg-slate-900"
					onClick={() => {
						console.log("Edit Submission");
					}}
				>
					<PencilSquareIcon className="h-4 w-4" />
				</button>
				<button
					className="p-2 bg-red-600 rounded-2xl text-white hover:bg-red-700"
					onClick={() => {
						console.log("Delete Submission");
					}}
				>
					<TrashIcon className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
};

SubmissionCard.propTypes = {
	submission: PropTypes.object.isRequired,
};

export default SubmissionCard;
