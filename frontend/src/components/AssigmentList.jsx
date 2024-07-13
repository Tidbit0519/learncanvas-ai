import { useState } from "react";
import PropTypes from "prop-types";

const AssignmentList = ({ assignments, setTutorAssignment }) => {
	const [activeId, setActiveId] = useState(null);

	const filteredAssignments = assignments.filter((assignment) => {
		return (
			assignment.submission_types.includes("online_upload") ||
			assignment.submission_types.includes("online_text_entry")
		);
	});

	const handleAssignmentClick = (id) => {
		setActiveId((prevId) => (prevId === id ? null : id));
	};

	return (
		<div className="flex flex-col gap-2">
			{filteredAssignments.map((assignment) => (
				<div
					key={assignment.id}
					className={`p-4 rounded-xl h-auto tracking-wider w-full hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer ${
						activeId === assignment.id
							? "bg-slate-700"
							: "bg-slate-800"
					}`}
					onMouseDown={() => {
						handleAssignmentClick(assignment.id);
						setTutorAssignment(assignment);
					}}
				>
					<div className="truncate">
						<p>{assignment.name}</p>
					</div>
				</div>
			))}
		</div>
	);
};

AssignmentList.propTypes = {
	assignments: PropTypes.array.isRequired,
	setTutorAssignment: PropTypes.func.isRequired,
};

export default AssignmentList;
