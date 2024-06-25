import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import useCanvasApi from "../features/canvas/useCanvasApi";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { styles } from "../utils/styles";
import AssignmentList from "../components/AssigmentList";

const Assignments = () => {
	const { courseId } = useParams();
	const token = useSelector(selectCurrentToken);
	const { loading, error, assignments, getAllAssignments } = useCanvasApi();

	useEffect(() => {
		if (token) {
			getAllAssignments(courseId);
		}
	}, [token]);

	return (
		<section
			className={`flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8`}
		>
			{/* It only works for online text entry and online upload for now */}
			<div className="flex items-center gap-2 bg-violet-500 p-2 rounded-lg text-slate-100">
				<ExclamationCircleIcon className="h-5 w-5" />
				<p>
					Please note that the assignments are only for {""}
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
			{loading ? (
				<p>Loading assignments...</p>
			) : (
				<>
					<div className="flex flex-col gap-4 bg-slate-900 p-8 rounded-2xl h-full">
						<h2 className={`${styles.sectionSubText} pl-2`}>
							Assignments
						</h2>
						<AssignmentList assignments={assignments} />
					</div>
				</>
			)}
			{error && <p>Error loading assignments.</p>}
		</section>
	);
};

export default Assignments;
