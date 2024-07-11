import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCanvasApi from "../features/canvas/useCanvasApi";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { styles } from "../utils/styles";
import AssignmentList from "../components/AssigmentList";

const Assignments = () => {
	const { courseId } = useParams();
	const { loading, error, assignments, getAllAssignments } = useCanvasApi();

	useEffect(() => {
			getAllAssignments(courseId);
	}, []);

	return (
		<div
			className={`flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8`}
		>
			{/* It only works for online text entry and online upload for now */}
			<div className="flex items-center gap-2 bg-violet-500 p-2 rounded-lg text-slate-100 px-4">
				<ExclamationCircleIcon className="h-20 w-20 lg:h-5 lg:w-5" />
				<p>
					Please note that we only include assigments that are {""}
					<span className="font-bold underline">
						online text entry
					</span>
					{""} and {""}
					<span className="font-bold underline">
						online upload
					</span>{" "}
					for now.
				</p>
			</div>
			<div className="flex flex-col">
				{error && (
					<p className="text-red-500 bg-red-200 rounded-md p-2 text-md text-center mb-4 w-1/2">
						Error loading assignments. Please try again later.
					</p>
				)}
				{loading ? (
					<p>Loading assignments...</p>
				) : (
					<>
						<div className="flex flex-col gap-4 bg-slate-900 p-8 rounded-2xl h-full w-full">
							<h2 className={`${styles.sectionSubText} pl-2`}>
								Assignments
							</h2>
							<AssignmentList assignments={assignments} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Assignments;
