import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import useCanvasApi from "../features/canvas/useCanvasApi";
import AssignmentCard from "../components/AssignmentCard";
import FeedbackCard from "../components/FeebackCard";

const Feedback = () => {
	const { courseId, assignmentId } = useParams();
	const {
		canvasError,
		userId,
		assignment,
		submission,
		getSelf,
		getAssignmentById,
		getSubmissionById,
	} = useCanvasApi();

	useEffect(() => {
		getSelf();
		getAssignmentById(courseId, assignmentId);
	}, []);

	useEffect(() => {
		if (userId) {
			getSubmissionById(courseId, assignmentId, userId);
		}
	}, [userId]);

	return (
		<div className={`flex flex-col justify-center gap-4 py-8 my-8 mx-4`}>
			<div className="flex items-center gap-2 bg-violet-500 p-2 rounded-lg text-slate-100 px-4">
				<ExclamationCircleIcon className="h-20 w-20 lg:h-5 lg:w-5" />
				<p>
					Please note that we only support assignments that are {""}
					<span className="font-bold underline">
						online text entry
					</span>
					{""} and {""}
					<span className="font-bold underline">
						online upload (.docx)
					</span>{" "}
					for now.
				</p>
			</div>
			<div className="flex flex-col gap-4 bg-slate-900 p-6 rounded-2xl h-full w-full">
				{canvasError && (
					<p className="text-red-500 bg-red-200 rounded-md p-2 text-md text-center mb-4 w-full lg:w-1/2">
						Error loading assignments. Please try again later.
					</p>
				)}
				{assignment && <AssignmentCard assignment={assignment} />}
				<div className="pt-2 border-t-2" />
				{submission && (
					<FeedbackCard
						assignment={assignment}
						submission={submission}
					/>
				)}
			</div>
		</div>
	);
};

export default Feedback;
