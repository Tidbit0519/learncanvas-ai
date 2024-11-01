import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { styles } from "../utils/styles";
import useCanvasApi from "../features/canvas/useCanvasApi";
import AssignmentList from "../components/AssigmentList";

const Assignments = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();

	const { loading, error, assignments, getAllAssignments } = useCanvasApi();
	useEffect(() => {
		getAllAssignments(courseId);
	}, []);

	const [tutorAssignment, setTutorAssignment] = useState(null);

	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className={`flex flex-col justify-center gap-4 py-8 my-8 mx-4`}>
			{/* It only works for online text entry and online upload for now */}
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
						<div className="flex flex-col gap-4 bg-slate-900 p-6 rounded-2xl h-full w-full">
							<h2 className={`${styles.sectionSubText} pl-2`}>
								Assignments
							</h2>
							<div className="flex flex-col gap-4">
								<input
									type="text"
									placeholder="Search assignments..."
									className="p-2 rounded-md bg-slate-600 text-slate-100 border-none"
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
							</div>
							<button
								className={`p-3 ml-auto rounded-xl text-slate-100 hover:bg-violet-800 tracking-wider max-w-[200px] text-sm min-w-fit ${
									tutorAssignment !== null
										? "bg-violet-700"
										: "bg-slate-500"
								}`}
								disabled={!tutorAssignment}
								onClick={() =>
									navigate(
										`/courses/${courseId}/assignments/${tutorAssignment.id}/feedback`
									)
								}
							>
								Tutor Me!
							</button>
							<AssignmentList
								assignments={assignments}
								setTutorAssignment={setTutorAssignment}
								searchTerm={searchTerm}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Assignments;
