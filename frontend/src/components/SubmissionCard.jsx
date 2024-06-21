import PropTypes from "prop-types";
import { Button } from "@headlessui/react";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const SubmissionCard = ({ submission }) => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-y-2 bg-slate-800 p-6 rounded-2xl h-auto tracking-wide">
			<p className="text-slate-500">ID: {submission._id}</p>
			<p>Summary: {submission.content_summary}</p>
			<p>Last Updated: {submission.updatedAt}</p>
			<div className="flex justify-end gap-2 pt-2">
				<Button
					className="p-2 bg-slate-800 rounded-2xl text-white hover:bg-slate-900"
					onClick={() => {
						navigate(`/submissions/${submission._id}`);
					}}
				>
					<EyeIcon className="h-4 w-4" />
				</Button>
				<Button
					className="p-2 bg-slate-800 rounded-2xl text-white hover:bg-slate-900"
					onClick={() => {
						console.log("Edit Submission");
					}}
				>
					<PencilSquareIcon className="h-4 w-4" />
				</Button>
				<Button
					className="p-2 bg-red-600 rounded-2xl text-white hover:bg-red-700"
					onClick={() => {
						console.log("Delete Submission");
					}}
				>
					<TrashIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

SubmissionCard.propTypes = {
	submission: PropTypes.object.isRequired,
};

export default SubmissionCard;
