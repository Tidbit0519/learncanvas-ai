import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { styles } from "../utils/styles";
import { Button } from "@headlessui/react";
import {
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import useSubmissionApi from "../features/submissions/useSubmissionApi";

const SubmissionById = () => {
    const { submissionId } = useParams();
    const { loading, error, submission, getSubmissionById } = useSubmissionApi();

    useEffect(() => {
        getSubmissionById(submissionId);
    }
    , []);

    return (
		<section className="flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8">
            <h2 className={`${ styles.sectionSubText } underline`}>Submission Details</h2>
			{loading && <p>Loading submission...</p>}
			{error && <p>Error loading submission.</p>}
			{submission && (
				<div className="flex flex-col justify-center gap-2">
					<p>ID: {submission._id}</p>
					<p>Content: {submission.content_summary}</p>
					<p>Created: {submission.createdAt}</p>
					<p>Last Updated: {submission.updatedAt}</p>
					<div className="flex gap-2 pt-2">
						<Button
							className="p-2 bg-slate-800 rounded-2xl text-slate-100 hover:bg-slate-900"
							onClick={() => {
								console.log("Edit Submission");
							}}
						>
							<PencilSquareIcon className="h-4 w-4" />
						</Button>
						<Button
							className="p-2 bg-red-600 rounded-2xl text-slate-100 hover:bg-red-700"
							onClick={() => {
								console.log("Delete Submission");
							}}
						>
							<TrashIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		</section>
	);
}

export default SubmissionById;